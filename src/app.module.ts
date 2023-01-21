import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { RateModule } from './rate/rate.module';
import { AppController } from './app.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get(
          'DB_HOST',
        )}:${configService.get('DB_PORT')}/${configService.get('DB_DATABASE')}`;
        return {
          uri,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
    }),
    AuthModule,
    ProfileModule,
    RateModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
