import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id!: number; // ID unique pour chaque enregistrement de like/dislike

    @Column('integer')
    user_id!: number; // ID de l'utilisateur qui a liké/disliké

    @Column('integer')
    movie_id!: number; // ID du film liké/disliké

    @Column({ default: true })
    is_like: boolean; // true pour un like, false pour un dislike

    constructor(user_id: number, movie_id: number, is_like: boolean = true) {
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.is_like = is_like;
    }
}
