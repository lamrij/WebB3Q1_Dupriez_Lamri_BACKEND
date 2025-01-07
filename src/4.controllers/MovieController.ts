import { Request, Response } from 'express';
import { movieService } from '../3.services/MovieService';
import { MovieRepository } from '../2.repositories/MovieRepository';
import { Movie } from '../1.models/MovieModel';
import { logger } from '../utilities/logger';

class MovieController {
    private readonly movieRepository: MovieRepository;


    constructor() {
        this.movieRepository = new MovieRepository();

    }
    async getMovies(req: Request, res: Response): Promise<void> {
        try {
            //logique de récupération
        } catch (error) {
            console.error('Error in getMovie:', error);
            res.status(500).json({ error: 'Error retrieving movie' });
        }
    }
    

    // Create a new movie
    async createMovie(req: Request, res: Response): Promise<void> {
        try {
            const movieToAdd: Movie = req.body;
            const movie = await movieService.createMovie(movieToAdd);

            if (movie) {
                res.status(201).json(movie);
            } else {
                res.status(500).json({ error: 'Error creating movie' });
            }
        } catch (error) {
            console.error('Error in createMovie:', error);
            res.status(500).json({ error: 'Error creating movie' });
        }
    }

    // Find a movie by ID
    async findMovieById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.body);
            const movie = await movieService.findMovieById(id);

            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            console.error('Error in findMovieById:', error);
            res.status(500).json({ error: 'Error finding movie' });
        }
    }

    // Find a movie by title
    async findMovieByTitle(req: Request, res: Response): Promise<void> {
        try {
            const title = req.body;
            const movie = await movieService.findMovieByTitle(title);

            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            console.error('Error in findMovieByTitle:', error);
            res.status(500).json({ error: 'Error finding movie' });
        }
    }
}

export const movieController = new MovieController();
