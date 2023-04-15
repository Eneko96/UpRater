import { Injectable, Logger } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { Rate } from './rate.model';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(private ratesRepository: RateRepository) {}

  private logger = new Logger('RateService');

  async updateOne(
    user: Types.ObjectId | ObjectId,
    rate_id: Types.ObjectId | ObjectId,
    rate: Partial<Rate> | Rate,
  ): Promise<Rate> {
    this.logger.log('Updating rate');
    return this.ratesRepository.updateOne(user, rate_id, rate);
  }

  async findOne(rate_id: ObjectId | Types.ObjectId): Promise<Rate | null> {
    this.logger.log('Finding rate');
    return this.ratesRepository.findOne(rate_id);
  }
}
