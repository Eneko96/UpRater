import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(
    session({
      secret: 'mysecret',
      resave: false,
      saveUninitialized: false,
      // expires: new Date(Date.now() + 60 * 60 * 1000),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
