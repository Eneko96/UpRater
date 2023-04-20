import { Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { RateRepository } from 'src/modules/rate/rate.repository';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction } from './reaction.model';
import { ReactionRepository } from './reaction.repository';

@Injectable()
export class ReactionService {
  constructor(
    private reactionRepository: ReactionRepository,
    private rateRepository: RateRepository,
  ) {}

  private logger = new Logger('ReactionService');
  async getReactions(rate_id: ObjectId): Promise<Reaction[]> {
    this.logger.log(`Getting reactions from ${rate_id}`);
    return this.reactionRepository.find({ rate_id });
  }

  async createReaction(
    user: User,
    reaction: CreateReactionDto,
    rate_id: ObjectId,
  ): Promise<Reaction> {
    this.logger.log('Creating reaction');
    try {
      const Reaction = this.reactionRepository.save(user, reaction, rate_id);
      this.rateRepository.incrementReactionCount(rate_id);
      return Reaction;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // would be better to pass the reaction object instead of the id? or maybe not? [TODO]
  async deleteReaction(user: User, reaction_id: ObjectId): Promise<Reaction> {
    this.logger.log('Deleting reaction');
    try {
      const Reaction = await this.reactionRepository.delete(user, reaction_id);
      this.rateRepository.decrementReactionCount(Reaction.parent_id);
      return Reaction;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
