import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentRepository],
  exports: [CommentRepository],
})
export class CommentModule {}
