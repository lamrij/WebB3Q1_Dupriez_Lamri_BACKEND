import { DataSource } from 'typeorm';
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: 'sqlite',          // Exemple avec SQLite ; adapte selon tes besoins
  database: './db.sqlite',
  synchronize: true,       // Déconseillé en production
  entities: [__dirname + '/../models/*.ts'],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
