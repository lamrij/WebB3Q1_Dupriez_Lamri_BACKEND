import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: false })
    adult: boolean;

    @Column('text', { nullable: true })  // Changé en text
    backdrop_path: string | null;

    @Column('simple-array')
    genre_ids: number[];

    @Column('text')
    original_language: string;

    @Column('text')
    original_title: string;

    @Column('text')
    overview: string;

    @Column('float')
    popularity: number;

    @Column('text', { nullable: true })  // Changé en text
    poster_path: string | null;

    @Column('text')
    release_date: string;

    @Column('text')
    title: string;

    @Column({ default: false })
    video: boolean;

    @Column('float')
    vote_average: number;

    @Column('integer')  // Précisé le type
    vote_count: number;

    constructor(
        adult: boolean,
        backdrop_path: string | null,
        genre_ids: number[],
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string | null,
        release_date: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    ) {
        this.adult = adult;
        this.backdrop_path = backdrop_path;
        this.genre_ids = genre_ids;
        this.original_language = original_language;
        this.original_title = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.video = video;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }
}