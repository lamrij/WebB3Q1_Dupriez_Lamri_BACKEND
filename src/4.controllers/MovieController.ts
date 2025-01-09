import { Request, Response } from 'express';
import { movieService } from '../3.services/MovieService';
import { MovieRepository } from '../2.repositories/MovieRepository';
import { Movie } from '../1.models/MovieModel';
import { likeService } from '../3.services/LikeService';
import { userService } from '../3.services/UserService';
import { familyService } from '../3.services/FamilyService';
import { providerService } from '../3.services/ProviderService';
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

    async findMoviesPaginated(req: Request, res: Response): Promise<void> {
        try {
            const { offset, limit } = req.body;

    
            const movies = await movieService.findMoviesPaginated(offset, limit);
    
            if (movies && movies.length > 0) {
                res.status(200).json({ movies });
            } else {
                res.status(404).json({ error: 'Movies not found' });
            }
        } catch (error) {
            console.error('Error in findMoviesPaginated:', error);
            res.status(500).json({ error: 'Error finding movies' });
        }
    }

    async GetMovieLikeByAllFamilyMembers(req: Request, res: Response): Promise<void> {
        const { familyId } = req.body;
    
        if (!familyId) {
            res.status(400).json({ error: 'Family ID is required in the request body' });
            return;
        }
    
        try {
            // Étape 1 : Récupérer les utilisateurs de la famille
            const users = await userService.getUsersInFamily(Number(familyId));
            if (!users || users.length === 0) {
                res.status(404).json({ error: 'No users found in this family' });
                return;
            }
    
            // Étape 2 : Récupérer tous les likes pour chaque utilisateur
            const allLikes = [];
            for (const user of users) {
                const userLikes = await likeService.getOnlyLikesByUser(user.id); // Méthode pour récupérer les likes d'un utilisateur
                if (userLikes) allLikes.push(...userLikes);
            }
    
            if (allLikes.length === 0) {
                res.status(404).json({ error: 'No likes found for the family' });
                return;
            }
    
            // Étape 3 : Récupérer les providers de la famille
            const family = await familyService.findFamilyById(Number(familyId));
            if (!family || !family.providers || family.providers.length === 0) {
                res.status(404).json({ error: 'No providers found for the family' });
                return;
            }
            const familyProviders = family.providers;
    
            // Étape 4 : Récupérer les films associés en filtrant par les providers de la famille
            const movies = [];
            for (const like of allLikes) {
                const movie = await movieService.findMovieById(like.movie_id); // Rechercher chaque film par ID
                if (movie) {
                    // Récupérer les providers du film
                    const movieProviders = await providerService.getProvidersByMovieId(movie.id);
                    if (!movieProviders || movieProviders.length === 0) continue;
                    const movieProviderNames = movieProviders.map((provider) => provider.provider);
    
                    // Vérifier si au moins un provider du film est dans la liste des providers de la famille
                    const hasMatchingProvider = movieProviderNames.some((providerName) =>
                        familyProviders.includes(providerName)
                    );
    
                    if (hasMatchingProvider) {
                        movies.push(movie); // Ajouter le film uniquement s'il a un provider correspondant
                    }
                }
            }
    
            // Envoyer la réponse
            if (movies.length > 0) {
                res.status(200).json({ movies: movies });
            } else {
                res.status(404).json({ error: 'Movies not found matching family providers' });
            }
        } catch (error) {
            console.error('Error in GetMovieLikeByAllFamilyMembers:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    
    
    
}

export const movieController = new MovieController();
