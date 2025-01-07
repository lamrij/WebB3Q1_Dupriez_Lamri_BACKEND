import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('providers') // Nom de la table
export class Provider {
    @PrimaryGeneratedColumn()
    id!: number; // ID unique pour chaque fournisseur

    @Column('int')
    movieId!: number; // ID du film associé au fournisseur

    @Column('varchar', { length: 255 })
    provider!: string; // Nom du fournisseur

    constructor(movieId: number, provider: string) {
        this.movieId = movieId;
        this.provider = provider;
    }
}
