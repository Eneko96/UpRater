import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';
import { RateModule } from 'src/modules/rate/rate.module';
import { CommentRepository } from './comment.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    RateModule,
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbit:5672'],
          queue: 'notification',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
