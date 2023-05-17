import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CsrfInterceptor } from '../auth/csrf.interceptor';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comment')
@UseGuards(AuthenticatedGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Query('rate') rate_id: string): Promise<Comment[]> {
    return this.commentService.getComments(rate_id);
  }

  @Post()
  @UseInterceptors(CsrfInterceptor)
  async createComment(
    @GetUser() user: User,
    @Body() comment: CreateCommentDTO,
  ): Promise<Comment> {
    return this.commentService.createComment(user, comment);
  }

  @Put()
  async updateComment(
    @GetUser() user: User,
    @Body() comment: UpdateCommentDTO,
    @Query('id') comment_id: string,
  ): Promise<Comment> {
    return this.commentService.updateComment(user, comment, comment_id);
  }

  @Delete()
  async deleteComment(
    @GetUser() user: User,
    @Query('id') comment_id: ObjectId,
  ): Promise<Comment> {
    return this.commentService.deleteComment(user, comment_id);
  }
}
