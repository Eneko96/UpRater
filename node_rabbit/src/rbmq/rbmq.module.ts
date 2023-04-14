import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RbmqService } from './rbmq.service';

interface RbmqModuleOptions {
  name: string;
}

@Module({
  providers: [RbmqService],
  exports: [RbmqService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
    }),
  ],
})
export class RbmqModule {
  static register({ name }: RbmqModuleOptions): DynamicModule {
    return {
      module: RbmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get('RABBIT_MQ_URI') as string],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                queueOptions: {
                  durable: true,
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
