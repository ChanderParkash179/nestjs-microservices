import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT_NUMBER_USER } from './user-service.constants';

async function bootstrap() {
  const user_app = await NestFactory.create(UserServiceModule);
  user_app.useGlobalPipes(new ValidationPipe())
  await user_app.listen(PORT_NUMBER_USER);
}

bootstrap();