import express, { Request, Response } from 'express';
import { movieController } from '../../4.controllers/MovieController'; // Assurez-vous que le chemin est correct

const moviePath = express.Router();

// Route pour créer un nouveau film
moviePath.post('/movies', (req: Request, res: Response) => {
    movieController.createMovie(req, res);
});

// Route pour trouver un film par ID
moviePath.get('/movies/:id', (req: Request, res: Response) => {
    movieController.findMovieById(req, res);
});

// Route pour trouver un film par titre
moviePath.get('/movies/title/:title', (req: Request, res: Response) => {
    movieController.findMovieByTitle(req, res);
});

export default moviePath;
