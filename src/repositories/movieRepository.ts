import { AppDataSource } from '../configs/configFiles/dbConfig';
import { Movie } from '../models/movieModel'; // Assurez-vous que le modèle Movie est correctement importé

export class MovieRepository {
    private movieRepository = AppDataSource.getRepository(Movie);

    // Méthode pour créer un nouveau film
    async createMovie(movie: Movie): Promise<Movie> {
        return await this.movieRepository.save(movie); 
    }

    // Méthode pour trouver un film par ID
    async findMovieById(id: number): Promise<Movie | null> {
        return this.movieRepository.findOne({
            where: { id }
        });
    }

    // Méthode pour trouver un film par titre
    async findMovieByTitle(title: string): Promise<Movie | null> {
        return this.movieRepository.findOne({
            where: { title }
        });
    }
}
