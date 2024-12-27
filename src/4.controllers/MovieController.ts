import { Request, Response } from 'express';
import { movieService } from '../3.services/MovieService';
import { MovieRepository } from '../2.repositories/MovieRepository';
import { Movie } from '../1.models/MovieModel';
import { tmdbScraperService } from '../3.services/TMDBScraperService';
import { logger } from '../utilities/logger';

class MovieController {
    private readonly movieRepository: MovieRepository;


    constructor() {
        this.movieRepository = new MovieRepository();

    }

    // Get all movies
    async getMovies(req: Request, res: Response): Promise<void> {
        try {
            // Check if db update is needed
            if (await tmdbScraperService.shouldUpdateDatabase()) {
                await tmdbScraperService.scrapeMovies();
            }

            // Get page from query params or default to 1
            const page = parseInt(req.query.page as string) || 1;
            const limit = 20; // Movies per page
            const offset = (page - 1) * limit;

            // Get movies from db
            const movies = await this.movieRepository.findMoviesPaginated(offset, limit);

            // This returns the page number and the movies through json
            res.status(200).json({
                page,
                movies
            });
        } catch (error) {
            logger.error('Error fetching movies:', error);
            res.status(500).json({ error: 'Error fetching movies from database' });
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
            const id = Number(req.params.id);
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
            const title = req.params.title;
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
