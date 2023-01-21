import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.model';
import { Rate } from './rate.model';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  getRates(): Promise<Rate[]> {
    return this.rateService.getRates();
  }

  @Post()
  // It is not working the create -- error 400 - "an unknown value was passed to the validate function" [TODO]
  createRate(@Body() rate: Rate, @GetUser() user: User): Promise<Rate> {
    return this.rateService.createRate(rate, user);
  }

  @Get('/my')
  getMyRates(@GetUser() user: User): Promise<Rate[]> {
    return this.rateService.getMyRates(user);
  }
}
