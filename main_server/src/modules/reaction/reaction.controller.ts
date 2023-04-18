import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction } from './reaction.model';
import { ReactionService } from './reaction.service';

@Controller('reaction')
@UseGuards(AuthenticatedGuard)
export class CommentController {
  constructor(private readonly reactionService: ReactionService) {}

  @Get()
  async getReactions(
    @Query('parent') parent_id: ObjectId,
  ): Promise<Reaction[]> {
    return this.reactionService.getReactions(parent_id);
  }

  @Post()
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
