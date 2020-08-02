import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
        return this.authService.signUp(authCreadentialsDto);
    }
    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCreadentialsDto: AuthCreadentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCreadentialsDto);
    }
}
