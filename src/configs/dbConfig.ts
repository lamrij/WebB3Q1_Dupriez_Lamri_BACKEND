import { DataSource } from 'typeorm';
import { User } from '../models/userModel'; // Chemin vers votre entité User
import { Movie } from '../models/movieModel'; // Chemin vers votre entité Movie
import { Token } from '../models/tokenModel'; // Chemin vers votre entité Token

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite', // Nom du fichier de votre base de données
    synchronize: true, // Synchronise le schéma de la base de données avec les entités
    entities: [User,Movie,Token], // Liste des entités
});