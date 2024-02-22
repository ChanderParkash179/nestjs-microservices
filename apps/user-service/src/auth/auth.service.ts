import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER_ALREADY_LOGGED_OUT, USER_LOGGED_OUT, USER_NOT_FOUND_BY_EMAIL, USER_UNAUTHORIZED_PARAMETERS } from '../user-service.message';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Status } from '../user/enums/user.status';

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
            user_email: user.email,
            user_id: user.id,
            user_role: user.role
        }

        await this.userService.updateStatus(Status.ACTIVE, user.email);

        return {
            access_token: this.jwtService.sign(request)
        }
    }

    async logout(params: string) {
        const email = params['email'];

        const user = await this.userService.findByEmail(email);

        if (!user) throw new NotFoundException(`${USER_NOT_FOUND_BY_EMAIL} - ${email}`);

        if (user.status === Status.UNACTIVE) throw new BadRequestException(USER_ALREADY_LOGGED_OUT);

        user.status = Status.UNACTIVE;

        const update = await this.userService.update(user.id, user);

        return {
            id: update.id,
            name: update.name,
            email: update.email,
            status: update.status,
            message: USER_LOGGED_OUT
        };
    }
}