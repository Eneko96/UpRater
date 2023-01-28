import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.model';
import { Rate } from './rate.model';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';

@Controller('rate')
@UseGuards(AuthGuard('jwt'))
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  async getRates(): Promise<Rate[]> {
    return await this.rateService.getRates();
  }

  @Post()
  createRate(
    @Body() rate: CreateRateDto,
    @GetUser() user: User,
  ): Promise<Rate> {
    return this.rateService.createRate(rate, user);
  }

  @Get('/my')
  async getMyRates(@GetUser() user: User, @Res() res): Promise<Rate[]> {
    const rates = await this.rateService.getMyRates(user);
    return res.status(200).json(rates);
  }
}
