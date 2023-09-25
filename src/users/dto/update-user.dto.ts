import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUsertDto {
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name? : String;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    lastname? : String;

    documento? : String;
    img? : String;
    notification_token? : String;
}