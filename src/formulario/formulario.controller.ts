import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';

@Controller('formulario')
export class FormularioController {

    constructor(private FormularioService: FormularioService) {}

    @Get()
    findAll(){
        return this.FormularioService.findAll()
    }

    @Get('listo')
    findReady(@Param('estado') estado: string){
        return this.FormularioService.findReady(estado)
    }

    @Get('pendiente')
    findNotReady(@Param('estado') estado: string){
        return this.FormularioService.findNotReady(estado)
    }


    @Get('searchf')
    findBySexo(@Param('sexo') sexo: string){
        return this.FormularioService.findBySexoF(sexo)
    }

    @Get('searchm')
    findBySexoM(@Param('sexo') sexo: string){
        return this.FormularioService.findBySexoM(sexo)
    }

    @Get('searchm1')
    findByMes1(@Param('created_at') created_at: string){
        return this.FormularioService.findByMes1(created_at)
    }


    @Get('searchm2')
    findByMes2(@Param('created_at') created_at: string){
        return this.FormularioService.findByMes2(created_at)
    }

    @Get('searchve')
    findVisitasEfectivas(@Param('cl_visita') cl_visita: string){
        return this.FormularioService.findVisitasEfectivas(cl_visita)
    }

    @Get('searchvne')
    findVisitasNoEfectivas(@Param('cl_visita') cl_visita: string){
        return this.FormularioService.findVisitasNoEfectivas(cl_visita)
    }

    @HasRoles(JwtRole.CLIENT, JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get('searcha/:tipo_documento/:num_documento')
    findByTypeAndNum(@Param('tipo_documento') tipo_documento: string,
                        @Param('num_documento') num_documento: string){
        return this.FormularioService.findByTypeAndNum(tipo_documento, num_documento)
    }

    @HasRoles(JwtRole.CLIENT, JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get('search/:tipo_documento/')
    findByType(@Param('tipo_documento') tipo_documento: string){
        return this.FormularioService.findByType(tipo_documento)
    }

    @HasRoles(JwtRole.CLIENT, JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get('searchn/:num_documento/')
    findByNum(@Param('num_documento') num_documento: string){
        return this.FormularioService.findByNum(num_documento)
    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post() //http//:localhost:3000/formulario -> POST
    @UseInterceptors(FileInterceptor('file'))
    createWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                  new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @Body() formulario: CreateFormularioDto
        ) {
        return this.FormularioService.create(file, formulario);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() formulario: UpdateFormularioDto) {
        return this.FormularioService.update(id, formulario);
    }

   
    @Put('upload/:id') //http//:localhost:3000/formulario -> PUT
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
        @Param('id', ParseIntPipe) id: number,
        @Body() formulario: UpdateFormularioDto
        ) {
        return this.FormularioService.updateWithImage(file, id, formulario);
    }


    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe) id: number){
            return this.FormularioService.delete(id);
        }


       
}
