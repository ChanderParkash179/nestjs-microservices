import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { User } from "./user/entities/user.entity";

dotenv.config();

export const TYPEORM_FEATURE_USER = TypeOrmModule.forFeature([User]);

export const TYPEORM_POSTGRES_CONFIG_USER = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: 'user',
    entities: [User],
    synchronize: true,
});