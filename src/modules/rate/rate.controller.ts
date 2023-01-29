import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.model';
import { Rate } from './rate.model';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { ObjectId } from 'mongoose';
import { UpdateRateDto } from './dto/update-user.dto';

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

  @Delete()
  async deleteRate(
    @GetUser() user: User,
    @Query('id') rate_id: string,
  ): Promise<Rate> {
    return this.rateService.deleteRate(user, rate_id);
  }

  @Put()
  async updateRate(
    @GetUser() user: User,
    @Body() rate: UpdateRateDto,
    @Query('id') rate_id: ObjectId,
  ): Promise<Rate> {
    return this.rateService.updateRate(user, rate_id, rate);
  }

  @Get('/my')
  async getMyRates(@GetUser() user: User): Promise<Rate[]> {
    return await this.rateService.getMyRates(user);
  }
}
