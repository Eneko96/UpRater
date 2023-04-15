import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { RateController } from './rate.controller';
import { RateSchema } from './rate.model';
import { RateRepository } from './rate.repository';
import { RateService } from './rate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rate', schema: RateSchema }]),
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
  providers: [RateService, RateRepository],
  controllers: [RateController],
  exports: [RateRepository, RateService],
})
export class RateModule {}
