import express from 'express';
import cors from 'cors';

import router from './routes/Router';
import { AppDataSource } from './configs/dbConfig';
const app = express();
const PORT = 3000;

// Le serveur utilise le routeur
app.use(cors());

app.use(router);


launchServer();

async function launchServer() {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

