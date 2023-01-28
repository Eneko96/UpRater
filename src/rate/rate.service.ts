import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.model';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './rate.model';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(private ratesRepository: RateRepository) {}

  private logger = new Logger('RateService');

  async getRates(): Promise<Rate[]> {
    this.logger.log('Getting all rates');
    return this.ratesRepository.find();
  }

  async createRate(rate: CreateRateDto, user: User): Promise<Rate> {
    this.logger.log('Creating a new rate');
    return await this.ratesRepository.save(rate, user);
  }

  async getMyRates(user: User): Promise<Rate[]> {
    this.logger.log('Getting all rates for user');
    return this.ratesRepository.find({ where: { user_id: user._id } });
  }
}
