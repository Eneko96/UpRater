import { Injectable, Logger } from '@nestjs/common';
import { Comment, CommentDocument } from './comment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/auth/user.model';
import { CreateRateDto } from './dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentsRepository: Model<CommentDocument>,
  ) {}

  private logger = new Logger('CommentRepository');

  async save(
    user: User,
    comment: CreateRateDto,
    rate_id: ObjectId,
  ): Promise<Comment> {
    this.logger.log('Creating comment');
    const newComment = new this.commentsRepository({
      ...comment,
      user_id: user._id,
      rate_id,
      created_at: new Date(),
    });
    return this.commentsRepository.create(newComment);
  }

  async find(args): Promise<Comment[]> {
    this.logger.log('Getting all comments');
    return this.commentsRepository.find({ ...args });
  }

  async delete(user: User, comment_id: ObjectId): Promise<Comment> {
    this.logger.log('Deleting comment');
    return this.commentsRepository.findOneAndDelete({
      user_id: user._id,
      _id: comment_id,
    });
  }
}
