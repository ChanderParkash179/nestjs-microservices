import { Module } from '@nestjs/common';
import { TYPEORM_POSTGRES_CONFIG_PRODUCT } from './product-service.constants';
import { ProductModule } from './product/product.module';

@Module({
    imports: [TYPEORM_POSTGRES_CONFIG_PRODUCT, ProductModule,]
})
export class ProductServiceModule { }
