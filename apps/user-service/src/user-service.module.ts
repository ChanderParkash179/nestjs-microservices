import { Module } from '@nestjs/common';
import { TYPEORM_POSTGRES_CONFIG_USER } from './user-service.constants';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TYPEORM_POSTGRES_CONFIG_USER, UserModule, AuthModule,],
})
export class UserServiceModule { }