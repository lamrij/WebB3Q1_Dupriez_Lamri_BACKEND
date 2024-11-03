import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import config from './configs/config';
import router from './routes/Router';
import { AppDataSource } from './configs/configFiles/dbConfig';

const app = express();
const PORT = 3000; // Port to run the server on

// Initial setup
function init() {
    logInfo('Initializing application...');
    validateEnvironment();
    configureStaticFiles(app);
    configureMiddlewares(app);
    configureRoutes(app);
    startServer(app);
}

// Function to validate environment variables
function validateEnvironment() {
    const configValidation = config.validateEnv();
    if (configValidation.isValid) {
        logInfo('Environment variables validation successful.');
    } else {
        logError(`Missing environment variables: ${configValidation.missingVars.join(', ')}`);
        logError('Please check your .env file and environment variable configurations.');
        process.exit(1); // Stop the server if essential variables are missing
    }
}

// Function to configure static file serving
function configureStaticFiles(app: express.Application) {
    if (config.isFrontendConnected) {
        const frontendPath = path.resolve(__dirname, config.frontendPath);
        app.use(express.static(frontendPath));
        logInfo(`Serving frontend files from: ${frontendPath}`);
    } else {
        logInfo('Frontend connection not detected. Skipping static file serving.');
    }
}

// Function to configure middlewares
function configureMiddlewares(app: express.Application) {
    if (!config.isProd()) {
        app.use(cors());
        logInfo('CORS enabled (development mode).');
    } else {
        logInfo('CORS disabled (production mode).');
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    logInfo('Middlewares configured successfully.');
}

// Function to configure routes
function configureRoutes(app: express.Application) {
    logInfo('Configuring routes...');
    app.use(router);
    logInfo('Routes configured successfully.');
}

// Function to start the server and initialize the database
async function startServer(app: express.Application) {
    try {
        await AppDataSource.initialize();
        logInfo('Database connection initialized successfully.');
        app.listen(PORT, () => {
            logInfo(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        logError('Failed to initialize the database connection:', error);
        process.exit(1);
    }
}

// Utility functions for uniform logging
function logInfo(message: string) {
    console.log(`[INFO] ${message}`);
}

function logError(message: string, error?: any) {
    console.error(`[ERROR] ${message}`);
    if (error) {
        console.error(error);
    }
}

// Run initial setup
init();
