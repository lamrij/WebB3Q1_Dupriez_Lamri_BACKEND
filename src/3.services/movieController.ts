import { Request, Response } from 'express';
import { MovieRepository } from '../2.repositories/movieRepository';
import { Movie } from '../1.models/MovieModel';

const movieRepository = new MovieRepository();

export class MovieController {
    // Create a new movie
    static async createMovie(req: Request, res: Response) {
        try {
            const movieToAdd: Movie = req.body;
            console.log(movieToAdd);

            // Vous pouvez ajouter une logique supplémentaire ici si nécessaire

            const movie = await movieRepository.createMovie(movieToAdd);
            res.status(201).json(movie);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating movie' });
        }
    }

    // Find a movie by id
    static async findMovieById(req: Request, res: Response) {
        try {
            const movie = await movieRepository.findMovieById(Number(req.params.id));
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error finding movie' });
        }
    }

    // Find a movie by title
    static async findMovieByTitle(req: Request, res: Response) {
        try {
            const movie = await movieRepository.findMovieByTitle(req.params.title);
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error finding movie' });
        }
    }
}
