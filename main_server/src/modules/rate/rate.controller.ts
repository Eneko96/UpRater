import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.model';
import { Rate } from './rate.model';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { Aggregate, ObjectId } from 'mongoose';
import { UpdateRateDto } from './dto/update-user.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CsrfInterceptor } from '../auth/csrf.interceptor';

@Controller('rate')
@UseGuards(AuthenticatedGuard)
export class RateController {
  constructor(private rateService: RateService) {}

  @Get('/all')
  async getRates(): Promise<Rate[]> {
    return await this.rateService.getRates();
  }

  @Post()
  @UseInterceptors(CsrfInterceptor)
  createRate(
    @Body()
    rate: CreateRateDto,
    @GetUser()
    user: User,
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
  @UseInterceptors(CsrfInterceptor)
  async updateRate(
    @Body()
    rate: UpdateRateDto,
    @GetUser()
    user: User,
    @Query('id')
    rate_id: ObjectId,
  ): Promise<Rate> {
    return this.rateService.updateRate(user, rate_id, rate);
  }

  @Get()
  async getMyRates(
    @GetUser() user: User,
  ): Promise<Aggregate<Rate[] | Aggregate<number>>> {
    return await this.rateService.getMyRates(user);
  }
}
