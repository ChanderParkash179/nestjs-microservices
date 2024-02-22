import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT_NUMBER_PRODUCT } from './product-service.constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const product_app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductServiceModule,
    {
      transport: Transport.TCP,
    },
  );
  product_app.useGlobalPipes(new ValidationPipe())
  product_app.listen();
}
bootstrap();
