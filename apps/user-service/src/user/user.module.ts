import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { REGISTER_PRODUCT_SERVICE, TYPEORM_FEATURE_USER } from '../user-service.constants';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TYPEORM_FEATURE_USER, REGISTER_PRODUCT_SERVICE]
})
export class UserModule { }