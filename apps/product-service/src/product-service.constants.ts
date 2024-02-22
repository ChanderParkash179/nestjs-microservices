import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { Product } from "./product/entities/product.entity";

dotenv.config();

export const PORT_NUMBER_USER = 3001;
export const PORT_NUMBER_PRODUCT = 3002;

export const BASE_URL_PRODUCT = `http://localhost:${PORT_NUMBER_PRODUCT}/product/`;
export const BASE_URL_USER = `http://localhost:${PORT_NUMBER_USER}/user/`;

export const TYPEORM_FEATURE_PRODUCT = TypeOrmModule.forFeature([Product]);

export const TYPEORM_POSTGRES_CONFIG_PRODUCT = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: 'product',
    entities: [Product],
    synchronize: true,
});