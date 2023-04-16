import { Controller, Inject, Logger } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Comment as IComment } from './comment.model';
import { CommentService } from './comment.service';
import { model } from 'src/lib/sentimentModel';
import { RateService } from '../rate/rate.service';
import mongoose from 'mongoose';
const cohere = require('cohere-ai'); // eslint-disable-line
cohere.init(
  process.env.COHERE_API_KEY || 'B3yFEFh14ZrzFoFDBMy6rEFKzBrSsP4qEPQXeSQN',
);

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly rateService: RateService,
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
  ) {}

  private logger = new Logger('CommentMessageController');

  @MessagePattern('comment_created')
  public async generateSentiment(
    @Payload() Comment: IComment,
    @Ctx() _ctx: RmqContext,
  ) {
    try {
      const response = await cohere.classify({
        inputs: [Comment.content],
        model: 'large',
        examples: model.examples,
      });
      const NewComment = await this.commentService.updateComment(
        Comment._id,
        {
          sentiment: response.body.classifications[0].prediction,
        },
        true,
      );
      this.logger.log(
        `sentiment for ${Comment._id} generated with: ${response.body.classifications[0].prediction}`,
      );
      this.client.emit('comment_calculate_weight', NewComment);
      _ctx.getChannelRef().ack(_ctx.getMessage());
    } catch (error) {
      console.error(error);
    }
  }

  @MessagePattern('comment_calculate_weight')
  public async calculateWeightFromnNewComment(
    @Payload() Comment: IComment,
    @Ctx() _ctx: RmqContext,
  ) {
    try {
      const relativeWeight = {
        positive: 1,
        neutral: 0.5,
        negative: 0,
      };

      const commentsCount = await this.commentService.countComments(
        new mongoose.Types.ObjectId(Comment.user_id),
        new mongoose.Types.ObjectId(Comment.rate_id),
      );

      const weightFromRates = await this.rateService.findOne(Comment.rate_id);

      const weight =
        (weightFromRates.weight * commentsCount +
          relativeWeight[Comment.sentiment]) /
        (commentsCount + 1);

      await this.rateService.updateOne(Comment.user_id, Comment.rate_id, {
        weight,
      });

      this.logger.log(`weight for ${Comment._id} updated with: ${weight}`);
      _ctx.getChannelRef().ack(_ctx.getMessage());
    } catch (error) {
      this.logger.error(error);
    }
  }
}
