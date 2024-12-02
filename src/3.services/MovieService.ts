import { MovieRepository } from '../2.repositories/movieRepository';
import { Movie } from '../1.models/MovieModel';

const movieRepository = new MovieRepository();

class MovieService {
    // Create a new movie
    async createMovie(movieToAdd: Movie): Promise<Movie | null> {
        try {
            return await movieRepository.createMovie(movieToAdd);
        } catch (error) {
            console.error('Error creating movie:', error);
            return null;
        }
    }

    // Find a movie by ID
    async findMovieById(id: number): Promise<Movie | null> {
        try {
            return await movieRepository.findMovieById(id);
        } catch (error) {
            console.error('Error finding movie by ID:', error);
            return null;
        }
    }

    // Find a movie by title
    async findMovieByTitle(title: string): Promise<Movie | null> {
        try {
            return await movieRepository.findMovieByTitle(title);
        } catch (error) {
            console.error('Error finding movie by title:', error);
            return null;
        }
    }
}

const movieService: MovieService = new MovieService();

export { movieService };
