import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rate, RateDocument } from './rate.model';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class RateRepository {
  constructor(
    @InjectModel(Rate.name)
    private readonly ratesRepository: Model<RateDocument>,
  ) {}

  private logger = new Logger('RateRepository');

  async updateOne(
    user_id: Types.ObjectId | ObjectId,
    _id: Types.ObjectId | ObjectId,
    comment: Partial<Rate> | Rate,
  ): Promise<Rate> {
    this.logger.log('Updating Rate');
    return this.ratesRepository.updateOne(
      {
        id: _id,
        user_from: user_id,
      },
      {
        ...comment,
      },
      {
        new: true,
      },
    ) as unknown as Promise<Rate>;
  }

  async findOne(_id: Types.ObjectId | ObjectId): Promise<Rate | null> {
    return this.ratesRepository.findOne({
      _id,
    });
  }
}
