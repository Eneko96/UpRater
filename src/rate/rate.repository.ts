import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Rate, RateDocument } from './rate.model';
import { Reactions, Topics } from './types';
import { Model } from 'mongoose';

@Injectable()
export class RateRepository {
  constructor(
    @InjectModel(Rate.name)
    private readonly ratesRepository: Model<RateDocument>,
  ) {}

  private logger = new Logger('RateRepository');

  // Not working yet [TODO]
  async findById(id: string): Promise<Rate> {
    const found = await this.ratesRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Rate with ID "${id}" not found`);
    }
    return found;
  }

  async find(args?): Promise<Rate[]> {
    return this.ratesRepository.find({ ...args });
  }

  async save(rate: Rate, user: User): Promise<Rate> {
    const { topics, reactions, ...rest } = rate;
    const createRate = this.ratesRepository.create({
      ...rest,
      topics: topics.map((topic) => Topics[topic]),
      reactions: reactions.map((reaction) => Reactions[reaction]),
      user: user,
    });
    const newRate = new this.ratesRepository(createRate);
    const result = await newRate.save();
    //const savedRate = await this.ratesRepository.save(createRate);
    this.logger.verbose(
      `User "${user.username}" created a new rate. Data: ${JSON.stringify(
        result,
      )}`,
    );
    return result;
  }
}
