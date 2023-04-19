import { Injectable, Logger } from '@nestjs/common';
import { Reaction, ReactionDocument } from './reaction.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class ReactionRepository {
  constructor(
    @InjectModel(Reaction.name)
    private readonly reactionsRepository: Model<ReactionDocument>,
  ) {}

  private logger = new Logger('ReactionRepository');

  async save(
    user: User,
    reaction: CreateReactionDto,
    parent_id: ObjectId,
  ): Promise<Reaction> {
    this.logger.log('Creating Reaction');
    const newReaction = new this.reactionsRepository({
      ...reaction,
      user_id: user._id,
      parent_id,
      created_at: new Date().toISOString(),
    });
    return this.reactionsRepository.create(newReaction);
  }

  async find(args): Promise<Reaction[]> {
    this.logger.log('Getting Reactions');
    return this.reactionsRepository.find({ ...args });
  }

  async delete(user: User, reaction_id: ObjectId): Promise<Reaction> {
    this.logger.log('Deleting Reaction');
    return this.reactionsRepository.findByIdAndDelete(reaction_id, {});
  }
}
