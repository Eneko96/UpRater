import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.model';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { CreateRateDto } from './dto/create-comment.dto';

@Controller('comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Query('rate') rate_id: ObjectId): Promise<Comment[]> {
    return this.commentService.getComments(rate_id);
  }

  @Post()
  async createComment(
    @GetUser() user: User,
    @Body() comment: CreateRateDto,
    @Body('rate_id') rate_id: ObjectId,
  ): Promise<Comment> {
    return this.commentService.createComment(user, comment, rate_id);
  }

  @Delete()
  async deleteComment(
    @GetUser() user: User,
    @Query('id') comment_id: ObjectId,
  ): Promise<Comment> {
    return this.commentService.deleteComment(user, comment_id);
  }
}
