import { IsNotEmpty, IsString } from "class-validator";

export class CreateFormularioDto {

    estado: string;

    @IsString()
    name_med: string;

    @IsString()
    name: string;

    tipo_documento: string;

    num_documento: string;

    @IsString()
    sexo: string;

    RH: string;

    fecha: string;
    
    telefono: string;

    tipo_visita: string;

    cl_visita: string;

    causa: string;

    direccion: string;

    barrio: string;

    propiedad: string;

    tensiona: string;

    tipo_ta: string;

    toma_ta: string;

    oximetria: string;

    toma_oxi: string;

    resultado_oxi: string;

    findrisk: string;

    estatura: string;

    peso: string;

    nota_uno: string;

    image: string;
}