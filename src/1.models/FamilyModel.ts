import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('families') // Nom de la table
export class Family {
    @PrimaryGeneratedColumn()
    id!: number; // ID unique pour chaque famille

    @Column('varchar', { length: 255 })
    nom!: string; // Nom de la famille

    constructor(nom: string) {
        this.nom = nom;
    }
}
