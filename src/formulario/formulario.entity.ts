import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'formulario' })
export class Formulario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    estado?: string;

    @Column()
    name_med?: string;

    @Column()
    name?: string;

    @Column()
    tipo_documento?: string;

    @Column()
    num_documento?: string;

    @Column()
    sexo?: string;

    @Column()
    RH?: string;

    @Column()
    fecha?: string;
    
    @Column()
    telefono?: string;

    @Column()
    tipo_visita?: string;

    @Column()
    cl_visita?: string;

    @Column()
    causa?: string;

    @Column()
    direccion?: string;

    @Column()
    barrio?: string;

    @Column()
    propiedad?: string;

    @Column()
    tensiona?: string;

    @Column()
    tipo_ta?: string;

    @Column()
    toma_ta?: string;

    @Column()
    oximetria?: string;

    @Column()
    toma_oxi?: string;

    @Column()
    resultado_oxi?: string;

    @Column()
    findrisk?: string;

    @Column()
    estatura?: string;

    @Column()
    peso?: string;

    @Column()
    nota_uno?: string;

    @Column()
    image?: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: string;

}