import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './userModel';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    token!: string;

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
    user!: User;
}
