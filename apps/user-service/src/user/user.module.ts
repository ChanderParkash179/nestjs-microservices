import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TYPEORM_FEATURE_USER } from '../user-service.constants';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TYPEORM_FEATURE_USER]
})
export class UserModule { }
