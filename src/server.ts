import express from 'express';
import router from './routes/Router';

const app = express();
const PORT = 3000;

// Le serveur utilise le routeur
app.use(router);

// Le serveur écoute mais ne fait rien pour l'instant
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
