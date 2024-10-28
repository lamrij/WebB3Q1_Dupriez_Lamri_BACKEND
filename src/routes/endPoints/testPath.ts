import express, { Request, Response } from 'express';

const testPath = express.Router();

testPath.get('/test', (req: Request, res: Response) => {
    const currentTime = new Date().toISOString(); // Obtient l'heure actuelle au format ISO
    res.json({
        api: 'Api is running',
        message: 'Authorized', // Message de réponse
        status: 'ok',
        time: currentTime // Ajoute l'heure actuelle à la réponse
    });
});

export default testPath;
