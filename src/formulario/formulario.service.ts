import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import storage = require('../utils/cloud_storage')
import { InjectRepository } from '@nestjs/typeorm';
import { Formulario } from './formulario.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';

@Injectable()
export class FormularioService {

    constructor(
        @InjectRepository(Formulario) private formularioRepository: Repository<Formulario>
    ){}

    findAll(){
        return this.formularioRepository.find()
    }

    findReady(estado: string){
        return this.formularioRepository.find({ where : {estado: 'Listo'}})
    }

    findNotReady(estado: string){
        return this.formularioRepository.find({ where : {estado: 'Pendiente'}})
    }

    findByTypeAndState(tipo_documento: string, estado: string) {
        return this.formularioRepository.find({
          where: {
            tipo_documento: Like(`%${tipo_documento}%`),
            estado: Like(`%${estado}%`)
          }
        });
      }

      findByNumAndState(num_documento: string, estado: string) {
        return this.formularioRepository.find({
          where: {
            num_documento: Like(`%${num_documento}%`),
            estado: Like(`%${estado}%`)
          }
        });
      }

    findByType(tipo_documento: string){
        return this.formularioRepository.find({ where : {tipo_documento: Like(`%${tipo_documento}%`)}})
    }

    findByNum(num_documento: string){
        return this.formularioRepository.find({ where : {num_documento: Like(`%${num_documento}%`)}})
    }

    findBySexoF(sexo: string){
        return this.formularioRepository.find({ where : {sexo: 'Femenino'}})
    }

    findBySexoM(sexo: string){
        return this.formularioRepository.find({ where : {sexo: 'Masculino'}})
    }

    findByMes1(created_at: string){
        return this.formularioRepository.find({ where : {created_at: Like(`%${'2023-07'}%`)}})
    }

    findByMes2(created_at: string){
        return this.formularioRepository.find({ where : {created_at: Like(`%${'2023-08'}%`)}})
    }

    findVisitasEfectivas(cl_visita: string){
        return this.formularioRepository.find({ where : {cl_visita: 'Efectiva'}})
    }

    findVisitasNoEfectivas(cl_visita: string){
        return this.formularioRepository.find({ where : {cl_visita: 'No efectiva'}})
    }

   findByTypeAndNum(tipo_documento: string, num_documento: string) {
        return this.formularioRepository.find({
          where: {
            tipo_documento: Like(`%${tipo_documento}%`),
            num_documento: Like(`%${num_documento}%`)
          }
        });
      }

    async create(file: Express.Multer.File, formulario: CreateFormularioDto ){
        
        const url = await storage(file, file.originalname);

        if(url === undefined && url === null){
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        formulario.image = url
        const newFormulario = this.formularioRepository.create(formulario)
        
        return this.formularioRepository.save(newFormulario);

    }

    async update(id: number, formulario: UpdateFormularioDto ){
        
        const formularioFound = await this.formularioRepository.findOneBy({ id: id});

        if(!formularioFound){
            throw new HttpException('El formulario no existe', HttpStatus.NOT_FOUND)
        }

        const updatedFormulario = Object.assign(formularioFound, formulario);
        return this.formularioRepository.save(updatedFormulario);

    }

    async updateWithImage(file: Express.Multer.File, id: number, formulario: UpdateFormularioDto ){
        
        const url = await storage(file, file.originalname);

        if(url === undefined && url === null){
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const formularioFound = await this.formularioRepository.findOneBy({ id: id});
        if(!formularioFound){
            throw new HttpException('El formulario no existe', HttpStatus.NOT_FOUND)
        }

        formulario.image = url
        const updatedFormulario = Object.assign(formularioFound, formulario);
        return this.formularioRepository.save(updatedFormulario);

    }

    async delete(id: number){
        const formularioFound = await this.formularioRepository.findOneBy({ id: id });

        if(!formularioFound) {
            throw new HttpException('El formulario no existe', HttpStatus.NOT_FOUND);
        }

        return this.formularioRepository.delete(id);
    }

}
