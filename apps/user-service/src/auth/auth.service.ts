import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER_UNAUTHORIZED_PARAMETERS } from '../user-service.message';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }

        return null;
    }

    async login(user: any) {
        const request = {
            email: user.email,
            sub: user.id,
            role: user.role
        }

        return {
            access_token: this.jwtService.sign(request)
        }
    }
}