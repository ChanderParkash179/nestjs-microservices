import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const TYPEORM_POSTGRES_CONFIG_PRODUCT = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: 'product',
    entities: [],
    synchronize: true,
});