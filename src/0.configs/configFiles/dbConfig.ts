import { DataSource } from 'typeorm';
import { User } from '../../1.models/UserModel';
import { Movie } from '../../1.models/MovieModel';
import { Token } from '../../1.models/TokenModel';
import Config from '../config'; // Import the Config class

// Database source configuration based on environment
export const AppDataSource = new DataSource({
    type: Config.typeormConnection as 'sqlite' | 'mariadb', // Specify the type of connection
    ...(Config.typeormConnection === 'sqlite'
        ? {
            database: 'database.sqlite', // SQLite database file for development
        }
        : {
            // NOT ALREADY TESTED /!\ DO NOT USE IN PRODUCTION NOW
            host: Config.typeormConfig.host, // MariaDB configuration for production
            port: Config.typeormConfig.port,
            username: Config.typeormConfig.username,
            password: Config.typeormConfig.password,
            database: Config.typeormConfig.database,
        }
    ),
    synchronize: !Config.isProd(), // Synchronize schema in non-production environments
    entities: [User, Movie, Token], // List of entities
});