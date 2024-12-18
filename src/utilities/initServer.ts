import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import config from '../0.configs/config';
import router from '../5.routes/Router';
import { AppDataSource } from '../0.configs/configFiles/dbConfig';
import { tokenController } from '../4.controllers/TokenController';
import { initializationService } from '../3.services/InitializationService';
import { logger } from './logger';


export class InitServer {
    private app: Application;
    private PORT: number;


    constructor(port: number = 3000) {
        this.app = express();
        this.PORT = port;

    }

    public async start() {
        this.logInfo('Initializing application...');
        this.validateEnvironment();
        this.configureStaticFiles();
        this.configureMiddlewares();
        this.configureRoutes();
        await this.startServer();
    }

    private validateEnvironment() {
        const configValidation = config.validateEnv();
        if (configValidation.isValid) {
            this.logInfo('Environment variables validation successful.');
        } else {
            this.logError(`Missing environment variables: ${configValidation.missingVars.join(', ')}`);
            this.logError('Please check your .env file and environment variable configurations.');
            process.exit(1); // Stop the server if essential variables are missing
        }
    }

    private configureStaticFiles() {
        if (config.isFrontendConnected) {
            const frontendPath = path.resolve(__dirname, config.frontendPath);
            this.app.use(express.static(frontendPath));
            this.logInfo(`Serving frontend files from: ${frontendPath}`);
        } else {
            this.logInfo('Frontend connection not detected. Skipping static file serving.');
        }
    }

    private configureMiddlewares() {
        if (!config.isProd()) {
            this.app.use(cors());
            this.logInfo('CORS enabled (development mode).');
        } else {
            this.logInfo('CORS disabled (production mode).');
        }
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.logInfo('Middlewares configured successfully.');
    }

    private configureRoutes() {
        this.logInfo('Configuring routes...');
        this.app.use(router);
        this.logInfo('Routes configured successfully.');
    }

    private async startServer() {
        try {
            await AppDataSource.initialize();
            this.logInfo('Database connection initialized successfully.');

            // initialize services
            await initializationService.initializeServices();

            // start token cleaner service
            tokenController.startTokenCleaner();
            this.logInfo('Token cleaner service started successfully.');

            this.app.listen(this.PORT, '0.0.0.0', () => {
                this.logInfo(`Server is running at http://localhost:${this.PORT}`);
            });
        } catch (error) {
            this.logError('Failed to initialize the database connection:', error);
            process.exit(1);
        }
    }

    // delete them to work with the logger 
    // Utility methods for logging
    private logInfo(message: string) {
        logger.info(message);
    }

    private logError(message: string, error?: any) {
        logger.error(message, error);
    }
}
