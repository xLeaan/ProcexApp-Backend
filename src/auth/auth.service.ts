import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,

        private jwtService: JwtService
    ) {}

    async register(user: RegisterAuthDTO) {

        const { email, documento } = user;
        const emailExist = await this.usersRepository.findOneBy({ email: email })

        if (emailExist){
            //409 CONFLICT(puede ser solucionado por el cliente)
            throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
        }

        const documentoExist = await this.usersRepository.findOneBy({ documento: documento })

        if(documentoExist){
            throw new HttpException('El documento ya está registrado', HttpStatus.CONFLICT);
        }

        const newUser = this.usersRepository.create(user);

        let rolesIds = [];
        if (user.rolesIds !== undefined && user.rolesIds !== null){
            rolesIds = user.rolesIds;
        }
        else {
            rolesIds.push('CLIENT')
        }

        const roles = await this.rolesRepository.findBy({ id: In (rolesIds)});
        newUser.roles = roles;

        const userSaved = await this.usersRepository.save(newUser);

        const rolesString = userSaved.roles.map(rol => rol.id);
        const payload = { 
            id: userSaved.id, 
            name: userSaved.name,
            roles: rolesString 
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userSaved,
            token: 'Bearer ' + token
        }

        delete data.user.password;

        return data;
    }

    async login(loginData: LoginAuthDto) {

        const { documento, password } = loginData;
        const userFound = await this.usersRepository.findOne({ 
            where: { documento: documento },
            relations: ['roles']
        })
        if (!userFound){
            //404 NOT_FOUND datos no encontados
            throw new HttpException('El documento no se encuentra registrado', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password, userFound.password);
        if(!isPasswordValid){
            //403 FORBITTEN acceso denegado
            throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }
        
        const rolesIds = userFound.roles.map(rol => rol.id); // ['CLIENT', 'ADMIN']

        const payload = { 
            id: userFound.id, 
            name: userFound.name, 
            roles: rolesIds
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: 'Bearer ' + token
        }

        delete data.user.password;

        return data;


    }
}
