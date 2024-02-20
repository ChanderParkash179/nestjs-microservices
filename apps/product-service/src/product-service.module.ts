import { Module } from '@nestjs/common';
import { TYPEORM_POSTGRES_CONFIG_PRODUCT } from './product-service.constants';

@Module({
    imports: [TYPEORM_POSTGRES_CONFIG_PRODUCT,]
})
export class ProductServiceModule { }
