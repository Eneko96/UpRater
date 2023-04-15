import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { Rate } from './rate.model';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(private ratesRepository: RateRepository) {}

  private logger = new Logger('RateService');

  async updateOne(
    user: Types.ObjectId,
    rate_id: Types.ObjectId,
    rate: Partial<Rate> | Rate,
  ): Promise<Rate> {
    this.logger.log('Updating rate');
    return this.ratesRepository.updateOne(user, rate_id, rate);
  }
}
