import { Injectable, Logger } from '@nestjs/common';
import { Comment, CommentDocument } from './comment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentsRepository: Model<CommentDocument>,
  ) {}

  private logger = new Logger('CommentRepository');

  async save(user: any, comment: any, rate_id: ObjectId): Promise<Comment> {
    this.logger.log('Creating comment');
    const newComment = new this.commentsRepository({
      ...comment,
      user_id: user._id,
      rate_id,
      created_at: new Date().toISOString(),
    });
    return this.commentsRepository.create(newComment);
  }

  async find(args?: any): Promise<Comment[]> {
    this.logger.log('Getting comments with', args);
    return this.commentsRepository.find({ ...args });
  }

  async findAll(): Promise<Comment[]> {
    this.logger.log('Getting all comments');
    return this.commentsRepository.find();
  }

  async delete(user: any, comment_id: ObjectId): Promise<Comment> {
    this.logger.log('Deleting comment');
    return this.commentsRepository.findOneAndDelete({
      user_id: user._id,
      _id: comment_id,
    });
  }

  async findOneAndUpdate(
    comment_id: ObjectId,
    comment: Partial<Comment>,
  ): Promise<Comment> {
    this.logger.log('Updating comment');
    return this.commentsRepository.findOneAndUpdate(
      {
        _id: comment_id,
      },
      {
        ...comment,
      },
      { new: true },
    );
  }

  async updateOne(
    _id: ObjectId,
    comment: Partial<Comment> | Comment,
  ): Promise<Comment> {
    this.logger.log('Updating Comment');
    return this.commentsRepository.updateOne(
      {
        _id,
      },
      {
        ...comment,
      },
      {
        new: true,
      },
    ) as unknown as Comment;
  }

  async count(args?: any): Promise<number> {
    return this.commentsRepository.countDocuments({ ...args });
  }
}
