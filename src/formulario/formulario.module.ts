import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulario } from './formulario.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Formulario])],
  providers: [FormularioService, JwtStrategy],
  controllers: [FormularioController]
})
export class FormularioModule {}
