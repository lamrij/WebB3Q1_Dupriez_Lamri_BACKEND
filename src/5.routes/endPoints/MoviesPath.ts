import express, { Request, Response } from 'express';
import { movieController } from '../../4.controllers/MovieController'; 

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

// Route for getting movies with pagination
moviePath.get('/movies', (req, res) => {
    movieController.findMoviesPaginated(req, res);
});



export default moviePath;
