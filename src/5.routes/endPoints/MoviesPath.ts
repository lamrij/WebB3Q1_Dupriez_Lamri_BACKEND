import express, { Request, Response } from 'express';
import { MovieController } from '../../3.services/movieController'; // Assurez-vous que le chemin est correct

const moviePath = express.Router();

// Route pour créer un nouveau film
moviePath.post('/movies', (req: Request, res: Response) => {
    MovieController.createMovie(req, res);
});

// Route pour trouver un film par ID
moviePath.get('/movies/:id', (req: Request, res: Response) => {
    MovieController.findMovieById(req, res);
});

// Route pour trouver un film par titre
moviePath.get('/movies/title/:title', (req: Request, res: Response) => {
    MovieController.findMovieByTitle(req, res);
});

export default moviePath;
