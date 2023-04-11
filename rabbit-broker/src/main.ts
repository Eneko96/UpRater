import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<NestMicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${configService.get('rb_url')}`],
        queue: `${configService.get('token_queue')}`,
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
  logger.log('Token service started');
}
bootstrap();
