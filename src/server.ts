import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/Router';
import { AppDataSource } from './configs/dbConfig';


const app = express();
// Port to run the server on
const PORT = 3000;

// Middlewares to allow cross-origin requests during development
app.use(cors());
// Middlewares to parse the body of incoming requests
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Routes are defined in the router file
app.use(router);

// Method to launch the server
launchServer();

// Method to launch the server and initialize the database
async function launchServer() {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

