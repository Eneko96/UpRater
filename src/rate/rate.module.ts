import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateController } from './rate.controller';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';
import { RateService } from './rate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RateService, RateRepository],
  controllers: [RateController],
})
export class RateModule {}
