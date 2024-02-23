import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { User } from "./user/entities/user.entity";
import { ClientProxyFactory, ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export const PORT_NUMBER_PRODUCT = 8002;
export const PORT_NUMBER_USER = 8001;

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

export const SECRET_KEY = process.env.SECRET_KEY || "Wd%ADTR*3KJ&2~xt9k4!UqVy";

export const TOKEN_EXPIRY_DURATION = process.env.TOKEN_EXPIRY_DURATION || "3600s";

export const UUID: string = uuidv4();

// ! Added Multiple SignOptions to prepare more protective token
export const JWT_REGISTER_MODULE = JwtModule.register({
    secret: SECRET_KEY,
    signOptions: {
        expiresIn: TOKEN_EXPIRY_DURATION,
        algorithm: 'HS512',
        jwtid: UUID
    }
});

export function decodeToken(token: any): any {
    return jwt.decode(token);
}