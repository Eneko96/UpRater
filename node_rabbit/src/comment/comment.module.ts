import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { RateModule } from 'src/rate/rate.module';
import { CommentController } from './comment.controller';
import { CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    RateModule,
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:mypassword@rabbit:5672'],
          queue: 'cohere_mongo',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
})
export class CommentModule {}
