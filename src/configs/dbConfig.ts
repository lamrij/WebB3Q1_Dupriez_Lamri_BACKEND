import { DataSource } from 'typeorm';
import { User } from '../models/userModel'; // Chemin vers votre entité User

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite', // Nom du fichier de votre base de données
    synchronize: true, // Synchronise le schéma de la base de données avec les entités
    entities: [User], // Liste des entités
});