import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { User } from "./user/entities/user.entity";
import { ClientProxyFactory, ClientsModule, Transport } from "@nestjs/microservices";

dotenv.config();

export const PORT_NUMBER_USER = 3001;
export const PORT_NUMBER_PRODUCT = 3002;

export const BASE_URL_PRODUCT = `http://localhost:${PORT_NUMBER_PRODUCT}/product/`;
export const BASE_URL_USER = `http://localhost:${PORT_NUMBER_USER}/user/`;

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

export const REGISTER_PRODUCT_SERVICE = ClientsModule.register([
    {
        name: 'PRODUCT-SERVICE',
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: PORT_NUMBER_PRODUCT
        }
    }
])

export const CLIENT_PROXY_CREATE = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
        host: '127.0.0.1',
        port: PORT_NUMBER_PRODUCT
    }
})