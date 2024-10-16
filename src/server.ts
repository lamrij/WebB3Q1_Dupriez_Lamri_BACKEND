import express from 'express';

const app = express();
const PORT = 3000;

// Le serveur écoute mais ne fait rien pour l'instant
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
