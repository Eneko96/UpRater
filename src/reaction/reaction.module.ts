import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CommentController } from './reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionSchema } from './reaction.model';
import { RateModule } from 'src/rate/rate.module';
import { ReactionRepository } from './reaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reaction', schema: ReactionSchema }]),
    RateModule,
  ],
  controllers: [CommentController],
  providers: [ReactionService, ReactionRepository],
})
export class ReactionModule {}
