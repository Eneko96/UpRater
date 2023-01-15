import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private ratesRepository: RateRepository,
  ) {}

  private logger = new Logger('RateService');

  async getRates(): Promise<Rate[]> {
    return this.ratesRepository.find();
  }

  async createRate(rate: CreateRateDto, user: User): Promise<Rate> {
    return this.ratesRepository.save(rate, user);
  }

  async getMyRates(user: User): Promise<Rate[]> {
    return this.ratesRepository.find({ where: { user } });
  }
}
