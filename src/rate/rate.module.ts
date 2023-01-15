import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RateController } from './rate.controller';
import { RateSchema } from './rate.model';
import { RateRepository } from './rate.repository';
import { RateService } from './rate.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rate', schema: RateSchema }])],
  providers: [RateService, RateRepository],
  controllers: [RateController],
})
export class RateModule {}
