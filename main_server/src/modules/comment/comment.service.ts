import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { RateRepository } from 'src/modules/rate/rate.repository';
import { Comment } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CreateRateDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private rateRepository: RateRepository,
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
  ) {}

  private logger = new Logger('CommentService');
  async getComments(rate_id: ObjectId): Promise<Comment[]> {
    this.logger.log(`Getting comments from ${rate_id}`);
    return this.commentRepository.find({ rate_id: rate_id });
  }

  async createComment(
    user: User,
    comment: CreateRateDto,
    rate_id: string,
  ): Promise<Comment> {
    this.logger.log('Creating comment');
    try {
      const rateObject = new mongoose.Types.ObjectId(rate_id);
      const Comment = await this.commentRepository.save(
        user,
        comment,
        rateObject,
      );
      this.rateRepository.incrementCommentCount(rateObject);
      this.client.emit('comment_created', Comment);
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
}
