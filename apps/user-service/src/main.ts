import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const user_app = await NestFactory.create(UserServiceModule);
  user_app.useGlobalPipes(new ValidationPipe())
  await user_app.listen(3001);
}
bootstrap();
