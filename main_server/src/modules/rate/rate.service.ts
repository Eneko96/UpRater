import { Injectable, Logger, ForbiddenException, Inject } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-user.dto';
import { Rate } from './rate.model';
import { RateRepository } from './rate.repository';
const DAY_IN_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class RateService {
  constructor(
    private ratesRepository: RateRepository,
    @Inject('NOTIFICATIONS_SERVICE') private readonly client,
  ) {}

  private logger = new Logger('RateService');

  async getRates(): Promise<Rate[]> {
    this.logger.log('Getting all rates');
    return this.ratesRepository.find();
  }

  async createRate(rate: CreateRateDto, user: User): Promise<Rate> {
    this.logger.log('Creating a new rate');
    const lastRate = await this.ratesRepository.find(
      {
        where: {
          user_id: user._id,
          $lte: { created_at: Date.now() - DAY_IN_MS },
        },
      },
      [
        { action: 'sort', args: { created_at: -1 } },
        { action: 'limit', args: 10 },
      ],
    );
    if (lastRate.length >= 15)
      throw new ForbiddenException(
        'Too many rates, you can only rate 15 times a day, and you have already rated 15 times today',
      );
    const Rate = await this.ratesRepository.save(rate, user);
    this.client.emit('rate_created', Rate);
    return Rate;
  }

  async getMyRates(user: User): Promise<Rate[]> {
    this.logger.log('Getting all rates for user');
    return this.ratesRepository.find({ where: { user_id: user._id } });
  }

  async deleteRate(user: User, rate_id: string): Promise<Rate> {
    this.logger.log('Deleting rate');
    return this.ratesRepository.delete(user, rate_id);
  }

  async updateRate(
    user: User,
    rate_id: ObjectId,
    rate: UpdateRateDto,
  ): Promise<Rate> {
    this.logger.log('Updating rate');
    return this.ratesRepository.update(user, rate_id, rate);
  }
}
