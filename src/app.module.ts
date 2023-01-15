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

      // useFactory: async (configService: ConfigService) => {
      //   const isProduction = configService.get('STAGE') === 'prod';
      //   return {
      //     ssl: isProduction,
      //     extra: {
      //       ssl: isProduction ? { rejectUnauthorized: false } : null,
      //     },
      //     type: 'mongodb',
      //     uri: configService.get('DB_URI'),
      //     useUnifiedTopology: true,
      //     useNewUrlParser: true,
      //     host: configService.get('DB_HOST'),
      //     port: configService.get('DB_PORT'),
      //     username: configService.get('DB_USERNAME'),
      //     password: configService.get('DB_PASSWORD'),
      //     database: configService.get('DB_DATABASE'),
      //     autoLoadEntities: true,
      //     synchronize: true,
      //   };
      // },
    }),
    AuthModule,
    ProfileModule,
    RateModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
