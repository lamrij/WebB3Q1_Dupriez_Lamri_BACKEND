import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import config from './configs/config';
import router from './routes/Router';
import { AppDataSource } from './configs/configFiles/dbConfig';

const app = express();
const PORT = 3000; // Port to run the server on

// Environment variable validation check
const configValidation = config.validateEnv();
if (!configValidation.isValid) {
    console.error('The following environment variables are missing:', configValidation.missingVars.join(', '));
    console.error('Please check the .env file and environment variables.');
    console.error('Server startup aborted.');
    process.exit(1); // Stop the server if essential variables are missing
} else {
    console.log('Environment variables validated successfully.');
    console.log('Proceeding to database initialization.');
}

// Serve static files from the frontend directory if the frontend is connected
if (config.isFrontendConnected) {
    const frontendPath = path.resolve(__dirname, config.frontendPath);
    app.use(express.static(path.resolve(__dirname, config.frontendPath)));
    console.log(`Serving frontend from ${frontendPath}`);

    // Handle client-side routing for Single Page Applications (SPAs)
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

// Middlewares
if (!config.isProd()) {
    app.use(cors());
}
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(router);

// Server start and database initialization
launchServer();

async function launchServer() {
    try {
        await AppDataSource.initialize();
        console.log('Database initialized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
        process.exit(1);
    }
}
