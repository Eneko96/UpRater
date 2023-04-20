import { Injectable, Logger, ForbiddenException, Inject } from '@nestjs/common';
import mongoose, { Aggregate, ObjectId } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-user.dto';
import { Rate } from './rate.model';
import { RateRepository } from './rate.repository';
const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000);

@Injectable()
export class RateService {
  constructor(
    private ratesRepository: RateRepository,
    @Inject('NOTIFICATIONS_SERVICE') private readonly client,
  ) {}

  private logger = new Logger('RateService');

  async getRates(): Promise<Rate[]> {
    this.logger.log('Getting all rates');
    return this.ratesRepository.find({});
  }

  async createRate(rate: CreateRateDto, user: User): Promise<Rate> {
    this.logger.log('Creating a new rate');
    const lastRates = await this.ratesRepository.find({
      args: { user_id: user._id, created_at: { $gte: YESTERDAY } },
      pipeline: [
        { action: 'sort', args: { created_at: -1 } },
        { action: 'limit', args: 15 },
      ],
    });

    if (lastRates.length >= 15)
      throw new ForbiddenException(
        'Too many rates, you can only rate 15 times a day, and you have already rated 15 times today',
      );
    const Rate = await this.ratesRepository.save(rate, user);
    this.client.emit('rate_created', Rate);
    return Rate;
  }

  async getMyRates(user: User): Promise<Aggregate<Rate[] | Aggregate<number>>> {
    console.log('user', user);
    this.logger.log('Getting all rates for user');
    const pipeline = [
      {
        $match: {
          user_to: new mongoose.Types.ObjectId(user._id as unknown as string),
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'user_from',
          foreignField: '_id',
          as: 'user_from_profile',
        },
      },
      {
        $addFields: {
          profile_from: '$user_from_profile.username',
        },
      },
      {
        $project: {
          user_from_profile: 0,
          user_from_id: 0,
        },
      },
    ];

    return this.ratesRepository.aggregate({
      options: pipeline,
    });
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
