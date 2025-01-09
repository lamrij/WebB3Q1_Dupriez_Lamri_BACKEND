import { AppDataSource } from '../0.configs/configFiles/DbConfig';
import { Movie } from '../1.models/MovieModel'; // Assurez-vous que le modèle Movie est correctement importé

export class MovieRepository {
    private movieRepository = AppDataSource.getRepository(Movie);

    // create movie
    async createMovie(movie: Movie): Promise<Movie> {
        return await this.movieRepository.save(movie); 
    }

    // find movie by ID
    async findMovieById(id: number): Promise<Movie | null> {
        return this.movieRepository.findOne({
            where: { id }
        });
    }

    // find movie by title
    async findMovieByTitle(title: string): Promise<Movie | null> {
        return this.movieRepository.findOne({
            where: { title }
        });
    }

    // find movies with pagination 
    async findMoviesPaginated(skip: number, take: number): Promise<Movie[]> {
        return await this.movieRepository.find({
            skip: skip, // Nombre de films à ignorer
            take: take, // Nombre de films à récupérer
            order: {
                popularity: 'DESC', // Trier par popularité de manière décroissante
            },
        });
    }
    
}

// choosing to use findMoviesPaginated instead of findAllMovies or find movies by title :
// using pagination allow to load movies in chunks of 20
// without using pagniation : could load all movies (millions) at once
// swiper needs a certain amount of movies to work 


// find movies by title : could return multiple movies with the same title
// find movies by ID : could return no movie if ID is incorrect

//  Mauvaise approche (sans pagination)
// const allMovies = await this.movieRepository.findAll(); 
// Problème : charge TOUS les films (potentiellement des milliers)

//  Bonne approche (avec pagination)
// const movies = await this.movieRepository.findMoviesPaginated(0, 20);
// Avantage : charge seulement 20 films