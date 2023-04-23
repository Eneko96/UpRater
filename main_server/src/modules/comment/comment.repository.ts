import { Injectable, Logger } from '@nestjs/common';
import { Comment, CommentDocument } from './comment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { CreateCommentDTO } from './dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentsRepository: Model<CommentDocument>,
  ) {}

  private logger = new Logger('CommentRepository');

  async save(
    user: User,
    comment: CreateCommentDTO,
    rate_id: ObjectId | Types.ObjectId,
  ): Promise<Comment> {
    this.logger.log('Creating comment');
    const newComment = new this.commentsRepository({
      ...comment,
      user_id: user._id,
      rate_id,
      created_at: new Date().toISOString(),
    });
    return this.commentsRepository.create(newComment);
  }

  async find({
    args,
    populate,
  }: {
    args: any;
    populate?: boolean;
  }): Promise<Comment[]> {
    this.logger.log('Getting comments with', args);
    let query: any = this.commentsRepository.find({ ...args });
    if (populate) {
      query = query.populate('user_id', 'username');
    }

    return query.exec();
  }

  async findAll(): Promise<Comment[]> {
    this.logger.log('Getting all comments');
    return this.commentsRepository.find();
  }

  async delete(user: User, comment_id: ObjectId): Promise<Comment> {
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
    this.logger.log('Updating comment');
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
}
