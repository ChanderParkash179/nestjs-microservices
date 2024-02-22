import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT_NUMBER_USER } from './user-service.constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const user_app = await NestFactory.create(UserServiceModule);
  user_app.useGlobalPipes(new ValidationPipe())

  user_app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: PORT_NUMBER_USER
    }
  });

  await user_app.startAllMicroservices();

  await user_app.listen(PORT_NUMBER_USER);
}
bootstrap();
