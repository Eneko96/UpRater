import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RbmqService } from './rbmq/rbmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rbmqService = app.get<RbmqService>(RbmqService);
  app.connectMicroservice(rbmqService.getOptions('COHERE'));
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
