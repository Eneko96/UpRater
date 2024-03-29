import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CsrfInterceptor } from '../auth/csrf.interceptor';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction } from './reaction.model';
import { ReactionService } from './reaction.service';

@Controller('reaction')
@UseGuards(AuthenticatedGuard)
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Get()
  async getReactions(
    @Query('parent') parent_id: ObjectId,
  ): Promise<Reaction[]> {
    return this.reactionService.getReactions(parent_id);
  }

  @Post()
  @UseInterceptors(CsrfInterceptor)
  async createReaction(
    @GetUser() user: User,
    @Body() reaction: CreateReactionDto,
    @Body('parent_id') parent_id: ObjectId,
  ): Promise<Reaction> {
    return this.reactionService.createReaction(user, reaction, parent_id);
  }

  @Delete()
  async deleteReaction(
    @GetUser() user: User,
    @Query('id') reaction_id: ObjectId,
  ): Promise<Reaction> {
    return this.reactionService.deleteReaction(user, reaction_id);
  }
}
