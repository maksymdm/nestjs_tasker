import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoty } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepositoty)
        private userRepository: UserRepositoty,
        private jwtService: JwtService,
    ) {}

    async signUp(authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
        return this.userRepository.signUp(authCreadentialsDto);
    }

    async signIn(authCreadentialsDto: AuthCreadentialsDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCreadentialsDto);
        if(!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }
}
