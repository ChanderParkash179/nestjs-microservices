import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const product_app = await NestFactory.create(ProductServiceModule);
  product_app.useGlobalPipes(new ValidationPipe())
  await product_app.listen(3002);
}
bootstrap();
