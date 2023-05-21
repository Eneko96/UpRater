import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '../../config.schema';
import { RateModule } from '../rate/rate.module';
import { AppController } from './app.controller';
import { ProfileModule } from '../profile/profile.module';
import { CommentModule } from '../comment/comment.module';
import { ReactionModule } from '../reaction/reaction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '../users/users.module';

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
        const uri =
          configService.get('MONGO_URI') ||
          process.env.MONGO_URI ||
          'mongodb://mongo-0.mongo.default.svc.cluster.local:27017,mongo-1.mongo.default.svc.cluster.local:27017,mongo-2.mongo.default.svc.cluster.local:27017/uprater?replicaSet=rs0';
        return {
          uri,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    RateModule,
    CommentModule,
    ReactionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
