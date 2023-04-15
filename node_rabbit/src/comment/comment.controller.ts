import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { Comment as IComment } from './comment.model';
import { CommentService } from './comment.service';
import { model } from 'src/lib/sentimentModel';
const cohere = require('cohere-ai'); // eslint-disable-line
cohere.init(
  process.env.COHERE_API_KEY || 'B3yFEFh14ZrzFoFDBMy6rEFKzBrSsP4qEPQXeSQN',
);

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  private logger = new Logger('CommentMessageController');

  @MessagePattern('comment_created')
  public async generateSentiment(
    @Payload() Comment: IComment,
    @Ctx() _ctx: any, // eslint-disable-line
  ) {
    try {
      const response = await cohere.classify({
        inputs: [Comment.content],
        model: 'large',
        examples: model.examples,
      });
      await this.commentService.updateComment(Comment._id, {
        sentiment: response.body.classifications[0].prediction,
      });
      this.logger.log(
        `sentiment for ${Comment._id} generated with: ${response.body.classifications[0].prediction}`,
      );
    } catch (error) {
      console.error(error);
    }
  }
}
