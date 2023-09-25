import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRolDto } from './dto/create-rol.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService){}

    /* @HasRoles(JwtRole.ADMIN) */
    /* @UseGuards(JwtAuthGuard, JwtRolesGuard) */
    @Post()
    create(@Body() rol: createRolDto){
        return this.rolesService.create(rol);
    }
}
