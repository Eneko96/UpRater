import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionSchema } from './reaction.model';
import { RateModule } from '../rate/rate.module';
import { ReactionRepository } from './reaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reaction', schema: ReactionSchema }]),
    RateModule,
  ],
  controllers: [ReactionController],
  providers: [ReactionService, ReactionRepository],
})
export class ReactionModule {}
