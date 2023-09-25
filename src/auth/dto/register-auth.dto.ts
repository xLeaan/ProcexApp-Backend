import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterAuthDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'El email no es válido'})
    email: string;

    @IsNotEmpty()
    @IsString()
    documento: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres '})
    password: string;

    
    rolesIds: string[];

}