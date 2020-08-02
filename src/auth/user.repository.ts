import { Repository, EntityRepository } from "typeorm";
import { User } from './user.entity'
import { AuthCreadentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepositoty extends Repository<User> {
    async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCreadentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const user = await this.findOne({username});
        if(user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password:string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}