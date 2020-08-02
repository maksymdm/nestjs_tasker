import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoty } from './user.repository';
import { JwtModule  } from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport"
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: {
        expiresIn:3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepositoty])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
