import { Request, Response } from 'express';
import TMDBConfig from '../0.configs/configFiles/tmdbConfig';
import { Movie } from '../1.models/MovieModel';

export class TMDBMovieController {
    static async getNowPlayingMovies(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const data = await TMDBConfig.getNowPlayingMovies(page);
            
            const movies = data.results.map((movieData: any) => new Movie(
                movieData.adult,
                movieData.backdrop_path,
                movieData.genre_ids,
                movieData.original_language,
                movieData.original_title,
                movieData.overview,
                movieData.popularity,
                movieData.poster_path,
                movieData.release_date,
                movieData.title,
                movieData.video,
                movieData.vote_average,
                movieData.vote_count
            ));

            res.status(200).json({
                page: data.page,
                total_pages: data.total_pages,
                movies
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).json({ error: 'Error fetching movies from TMDB' });
        }
    }
}