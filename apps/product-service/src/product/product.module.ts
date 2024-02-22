import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TYPEORM_FEATURE_PRODUCT } from '../product-service.constants';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [TYPEORM_FEATURE_PRODUCT]
})
export class ProductModule { }
