import { Module } from '@nestjs/common';
import { TYPEORM_POSTGRES_CONFIG_USER } from './user-service.constants';

@Module({
    imports: [TYPEORM_POSTGRES_CONFIG_USER,]
})
export class UserServiceModule { }
