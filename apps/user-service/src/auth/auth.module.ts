import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWT_REGISTER_MODULE } from '../user-service.constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [UserModule, PassportModule, JWT_REGISTER_MODULE]
})
export class AuthModule { }
