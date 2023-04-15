import { Injectable, Logger } from '@nestjs/common';
import { Schema, ObjectId, Types } from 'mongoose';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.model';

@Injectable()
export class CommentService {
  constructor(private commentsRepository: CommentRepository) {}

  private logger = new Logger('CommentService');

  async getComments(
    rate_id: ObjectId | Schema.Types.ObjectId | Types.ObjectId,
  ): Promise<Comment[]> {
    this.logger.log('Getting all comments');
    return this.commentsRepository.find({ rate_id });
  }

  async createComment(
    user: any,
    comment: any,
    rate_id: ObjectId,
  ): Promise<Comment> {
    this.logger.log('Creating comment');
    return this.commentsRepository.save(user, comment, rate_id);
  }

  async getMyComments(user: any): Promise<Comment[]> {
    this.logger.log('Getting all comments for user');
    return this.commentsRepository.find({ user_id: user._id });
  }

  async deleteComment(user: any, comment_id: ObjectId): Promise<Comment> {
    this.logger.log('Deleting comment');
    return this.commentsRepository.delete(user, comment_id);
  }

  async updateComment(
    comment_id: ObjectId,
    comment: Partial<Comment>,
    newObject: boolean,
  ): Promise<Comment> {
    this.logger.log('Updating comment');
    if (newObject)
      return this.commentsRepository.findOneAndUpdate(comment_id, comment);
    return this.commentsRepository.updateOne(comment_id, comment);
  }

  async countComments(
    user_id: ObjectId | Schema.Types.ObjectId | Types.ObjectId,
    rate_id: ObjectId | Schema.Types.ObjectId | Types.ObjectId,
  ): Promise<number> {
    this.logger.log('Counting comments');
    return this.commentsRepository.count({ rate_id, user_id });
  }
}
