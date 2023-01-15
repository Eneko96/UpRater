import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './rate.entity';
import { Reactions, Topics } from './types';

@Injectable()
export class RateRepository {
  constructor(
    @InjectRepository(Rate)
    private readonly ratesRepository: Repository<Rate>,
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
    return this.ratesRepository.find(...args);
  }

  async save(rate: CreateRateDto, user: User): Promise<Rate> {
    const { topics, reactions, ...rest } = rate;
    const createRate = this.ratesRepository.create({
      ...rest,
      topics: topics.map((topic) => Topics[topic]),
      reactions: reactions.map((reaction) => Reactions[reaction]),
      user: user,
    });
    const savedRate = await this.ratesRepository.save(createRate);
    this.logger.verbose(
      `User "${user.username}" created a new rate. Data: ${JSON.stringify(
        savedRate,
      )}`,
    );
    return savedRate;
  }
}
