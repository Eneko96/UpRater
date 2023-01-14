import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  getRates(): Promise<Rate[]> {
    return this.rateService.getRates();
  }

  @Post()
  createRate(
    @Body() rate: CreateRateDto,
    @GetUser() user: User,
  ): Promise<Rate> {
    return this.rateService.createRate(rate, user);
  }
}
