import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ObjectId } from 'mongoose';
import { model } from 'src/lib/sentimentModel';
import { User } from 'src/modules/auth/user.model';
import { RateRepository } from 'src/modules/rate/rate.repository';
import { Comment } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CreateRateDto } from './dto/create-comment.dto';
const cohere = require('cohere-ai'); // eslint-disable-line
cohere.init(process.env.COHERE_API_KEY);

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private rateRepository: RateRepository,
  ) {}

  private logger = new Logger('CommentService');
  async getComments(rate_id: ObjectId): Promise<Comment[]> {
    this.logger.log(`Getting comments from ${rate_id}`);
    return this.commentRepository.find({ rate_id: rate_id });
  }

  async createComment(
    user: User,
    comment: CreateRateDto,
    rate_id: ObjectId,
  ): Promise<Comment> {
    this.logger.log('Creating comment');
    try {
      const Comment = this.commentRepository.save(user, comment, rate_id);
      this.rateRepository.incrementCommentCount(rate_id);
      return Comment;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // would be better to pass the comment object instead of the id? or maybe not? [TODO]
  async deleteComment(user: User, comment_id: ObjectId): Promise<Comment> {
    this.logger.log('Deleting comment');
    try {
      const Comment = await this.commentRepository.delete(user, comment_id);
      this.rateRepository.decrementCommentCount(Comment.rate_id);
      return Comment;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCommentSentiment() {
    this.logger.log('Handling comment sentiment');
    const comments = await this.commentRepository.findAll();
    const commentContent = comments.filter(
      (comment) => !Object.keys(comment).includes('sentiment'),
    );

    const commentContentArray = commentContent.map(
      (comment) => comment.content,
    );
    try {
      const response = await cohere.classify({
        inputs: commentContentArray,
        model: 'large',
        examples: model.examples,
      });
      for (let i = 0; i < response.body.classifications.length; i++) {
        await this.commentRepository.updateOne(commentContent[i]._id, {
          sentiment: response.body.classifications[i].prediction,
        });
      }
      this.logger.log(`Sentiment of ${comments.length} comments handled`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
