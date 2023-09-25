import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { createRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Rol) private rolesRepository: Repository<Rol>){}

    create(rol: createRolDto){
        const newRol = this.rolesRepository.create(rol);
        return this.rolesRepository.save(newRol);
    }

}
