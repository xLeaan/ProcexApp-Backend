import { Body, Controller, Get, Post, UseGuards, Put, Param, ParseIntPipe, UseInterceptors, UploadedFile, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUsertDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    // GET -> OBTENER
    //POST -> CREAR
    //PUT | PATCH -> ACTUALIZAR
    //DELETE ' ' -> BORRAR
    
    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get() //http://10.251.210.37/users -> GET
    findAll(){
        return this.usersService.findAll();

    }

    @Post() //http://10.251.210.37/users -> POST
    create(@Body() user: CreateUserDTO){
        return this.usersService.create(user);

    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') //http://10.251.210.37/users/:id -> PUT
    update(@Param('id', ParseIntPipe)id: number, @Body() user: UpdateUsertDto){
        return this.usersService.update(id, user);

    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                  new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @Param('id', ParseIntPipe)id: number, 
        @Body() user: UpdateUsertDto
        ) {
        return this.usersService.updateWithImage(file, id, user);
    }


}
