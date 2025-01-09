import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('families') // Nom de la table
export class Family {
    @PrimaryGeneratedColumn()
    id!: number; // ID unique pour chaque famille

    @Column('varchar', { length: 255 })
    nom!: string; // Nom de la famille

    @Column('boolean', { default: false })
    likeToRewatch!: boolean; // Indique si la famille aime revoir les films

    @Column('simple-array')
    providers!: string[]; // Liste des noms de providers associés à la famille

    constructor(nom: string, providers: string[] = []) {
        this.nom = nom;
        this.providers = providers;
    }
}
