import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCreadentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A_Z])(?=.*[a-z]).*$/, {message: 'password to weak'})
    password: string;
}