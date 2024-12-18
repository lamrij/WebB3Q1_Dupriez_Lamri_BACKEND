import TMDBConfig from "../0.configs/configFiles/tmdbConfig";
import { Movie } from "../1.models/MovieModel";
import { MovieRepository } from "../2.repositories/movieRepository";
import { logger } from '../utilities/logger';

class TMDBScraperService {
    private movieRepository: MovieRepository;
    private isScrapingInProgress: boolean;
    private lastScrapingTime: Date | null;
    private readonly SCRAPING_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours in milliseconds


    constructor() {
        this.movieRepository = new MovieRepository();
        this.isScrapingInProgress = false;
        this.lastScrapingTime = null;

    }

    // Check if we need to update our database
    async shouldUpdateDatabase(): Promise<boolean> {
        if (this.isScrapingInProgress) return false;
        
        if (!this.lastScrapingTime) return true;
        
        const timeSinceLastScraping = Date.now() - this.lastScrapingTime.getTime();
        return timeSinceLastScraping >= this.SCRAPING_COOLDOWN;
    }

    // Main scraping method
    async scrapeMovies(totalPages: number = 5): Promise<void> {
        if (this.isScrapingInProgress) {
            logger.warn('Scraping already in progress');
            return;
        }

        try {
            this.isScrapingInProgress = true;
            logger.info('Starting TMDB scraping process...');

            for (let page = 1; page <= totalPages; page++) {
                logger.info(`Scraping page ${page}/${totalPages}`);
                
                // Get movies from TMDB
                const movieData = await TMDBConfig.getNowPlayingMovies(page);
                
                // Process each movie
                for (const tmdbMovie of movieData.results) {
                    await this.processMovie(tmdbMovie);
                }
                
                // Add delay to respect TMDB rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            this.lastScrapingTime = new Date();
            logger.info('Scraping completed successfully');

        } catch (error) {
            logger.error('Error during scraping:', error);
            throw error;

        } finally {
            this.isScrapingInProgress = false;
        }
    }

    // Process individual movie
    private async processMovie(tmdbMovie: any): Promise<void> {
        try {
            // Check if movie already exists
            const existingMovie = await this.movieRepository.findMovieByTitle(tmdbMovie.title);

            if (!existingMovie) {
                // Create new movie instance
                const movie = new Movie(
                    tmdbMovie.adult,
                    tmdbMovie.backdrop_path,
                    tmdbMovie.genre_ids,
                    tmdbMovie.original_language,
                    tmdbMovie.original_title,
                    tmdbMovie.overview,
                    tmdbMovie.popularity,
                    tmdbMovie.poster_path,
                    tmdbMovie.release_date,
                    tmdbMovie.title,
                    tmdbMovie.video,
                    tmdbMovie.vote_average,
                    tmdbMovie.vote_count
                );

                // Save to database
                await this.movieRepository.createMovie(movie);
                logger.info(`Added movie: ${movie.title}`);
            }
        } catch (error) {
            logger.error(`Error processing movie ${tmdbMovie.title}:`, error);
            // Continue with next movie even if this one fails
        }
    }
}

const tmdbScraperService: TMDBScraperService = new TMDBScraperService();
export { tmdbScraperService };