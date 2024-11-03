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

    @CreateDateColumn()
    createdAt!: Date;

    @Column('datetime', { nullable: false }) // Supprimez la valeur par défaut ici
    expiresAt!: Date;

    @Column('text') // Utilise 'text' pour le type
    status!: 'valid' | 'revoked';
}
