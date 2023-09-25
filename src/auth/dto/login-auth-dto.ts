
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {

    @IsNotEmpty()
    documento: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}