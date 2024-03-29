import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '../auth/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Rate, RateDocument } from './rate.model';
import { Topics } from './types';
import mongoose, { Aggregate, Model, ObjectId, Types } from 'mongoose';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-user.dto';
import { UPDATE_STRATEGY_OPTIONS } from '../../lib/updateStrategy';
import { pipe } from '../../lib/pipe';

@Injectable()
export class RateRepository {
  constructor(
    @InjectModel(Rate.name)
    private readonly ratesRepository: Model<RateDocument>,
  ) {}

  private logger = new Logger('RateRepository');

  async findById(id: string): Promise<Rate> {
    const found = await this.ratesRepository
      .findOne({
        where: { id },
      })
      .exec();
    if (!found) {
      throw new NotFoundException(`Rate with ID "${id}" not found`);
    }
    return found;
  }

  async find({
    args,
    pipeline,
    populate,
  }: {
    populate?: Record<string, string[]>;
    pipeline?: { action: string; args: any | any[] }[];
    args?: any;
  }): Promise<Rate[]> {
    let query = this.ratesRepository.find({ ...args });
    if (pipeline && pipeline.length)
      query = pipe<typeof query>(query, pipeline);

    if (populate) {
      for (const [key, value] of Object.entries(populate)) {
        query = query.populate(key, ...value);
      }
    }

    return query.exec();
  }

  async aggregate({
    options,
  }: {
    options: any;
  }): Promise<Aggregate<Rate[] | Aggregate<number>>> {
    return this.ratesRepository.aggregate(options);
  }

  async save(rate: CreateRateDto, user: User): Promise<Rate> {
    const { topics, ...rest } = rate;
    const createRate = new this.ratesRepository({
      ...rest,
      topics: topics.map((topic) => Topics[topic]),
      user_id: user._id,
      comments_count: 0,
      reactions_count: 0,
      user_to: new mongoose.Types.ObjectId(rate.user_to),
      user_from: user._id,
      created_at: new Date().toISOString(),
    });
    const result = createRate.save({ validateBeforeSave: true });
    this.logger.verbose(
      `User "${user.email}" created a new rate. Data: ${JSON.stringify(
        result,
      )}`,
    );
    return result;
  }

  async update(
    user: User,
    rate_id: ObjectId,
    options: UpdateRateDto,
  ): Promise<Rate> {
    return this.ratesRepository.findOneAndUpdate(
      { user_id: user._id, rate_id: rate_id },
      {
        $set: options,
      },
      { new: UPDATE_STRATEGY_OPTIONS[Rate.name].return_new },
    );
  }

  async delete(user: User, rate_id: string): Promise<Rate> {
    return this.ratesRepository.findOneAndDelete({
      _id: rate_id,
      user_id: user._id,
    });
  }

  async incrementCommentCount(
    rate_id: ObjectId | Types.ObjectId,
  ): Promise<Rate> {
    this.logger.log('incrementing comment count', rate_id);
    return this.ratesRepository.findOneAndUpdate(
      { _id: rate_id },
      { $inc: { comments_count: 1 } },
      { new: UPDATE_STRATEGY_OPTIONS[Rate.name].return_new },
    );
  }

  async incrementReactionCount(rate_id: ObjectId): Promise<Rate> {
    return this.ratesRepository.findOneAndUpdate(
      { _id: rate_id },
      { $inc: { reactions_count: 1 } },
      { new: UPDATE_STRATEGY_OPTIONS[Rate.name].return_new },
    );
  }

  async decrementReactionCount(rate_id: ObjectId): Promise<Rate> {
    return this.ratesRepository.findOneAndUpdate(
      { _id: rate_id },
      { $inc: { reactions_count: -1 } },
      { new: UPDATE_STRATEGY_OPTIONS[Rate.name].return_new },
    );
  }

  async decrementCommentCount(rate_id: ObjectId): Promise<Rate> {
    return this.ratesRepository.findOneAndUpdate(
      { _id: rate_id },
      { $inc: { comments_count: -1 } },
      { new: UPDATE_STRATEGY_OPTIONS[Rate.name].return_new },
    );
  }
}
