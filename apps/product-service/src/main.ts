import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT_NUMBER_PRODUCT } from './product-service.constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const product_app = await NestFactory.create(ProductServiceModule);
  product_app.useGlobalPipes(new ValidationPipe())

  product_app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: PORT_NUMBER_PRODUCT
    }
  });

  await product_app.startAllMicroservices();
  await product_app.listen(PORT_NUMBER_PRODUCT);
}
bootstrap();
