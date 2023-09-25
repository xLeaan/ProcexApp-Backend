import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register') //http://localhost/auth/register -> POST 192.168.137.1
    register(@Body() user: RegisterAuthDTO){
        return this.authService.register(user);
    }

    @Post('login') //http://localhost/auth/login -> POST
    login(@Body() loginData: LoginAuthDto){
        return this.authService.login(loginData);
    }

}
