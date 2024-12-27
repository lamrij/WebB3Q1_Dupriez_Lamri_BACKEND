import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Token } from './TokenModel';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    birthdate: Date;

    @OneToMany(() => Token, (token) => token.user)
    tokens!: Token[];

    @Column()
    family!: number;
    

    constructor(
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        email: string,
        birthdate: Date,
        family: number = -1
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.birthdate = birthdate;
        this.family = family;
    }
}
