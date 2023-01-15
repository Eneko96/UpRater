import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Rate } from './rate.model';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(private ratesRepository: RateRepository) {}

  private logger = new Logger('RateService');

  async getRates(): Promise<Rate[]> {
    return this.ratesRepository.find();
  }

  async createRate(rate: Rate, user: User): Promise<Rate> {
    return this.ratesRepository.save(rate, user);
  }

  async getMyRates(user: User): Promise<Rate[]> {
    return this.ratesRepository.find({ where: { user } });
  }
}
