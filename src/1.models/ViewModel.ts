import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('views') // Nom de la table
export class View {
    @PrimaryGeneratedColumn()
    id!: number; // ID unique pour chaque vue

    @Column('int')
    userId!: number; // ID de l'utilisateur ayant vu le film

    @Column('int')
    movieId!: number; // ID du film vu

    constructor(userId: number, movieId: number) {
        this.userId = userId;
        this.movieId = movieId;
    }
}
