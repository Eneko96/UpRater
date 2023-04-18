import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // ConfigModule,
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
