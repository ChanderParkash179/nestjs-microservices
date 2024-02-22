import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
