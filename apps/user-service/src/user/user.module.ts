import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PORT_NUMBER_PRODUCT, TYPEORM_FEATURE_USER } from '../user-service.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TYPEORM_FEATURE_USER, ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: PORT_NUMBER_PRODUCT
      }
    }
  ])],
  exports: [UserService]
})
export class UserModule { }