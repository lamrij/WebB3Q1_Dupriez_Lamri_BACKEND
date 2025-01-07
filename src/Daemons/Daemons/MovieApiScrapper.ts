import TMDBConfig from "../../0.configs/configFiles/MovieApiConfig";
import { Movie } from "../../1.models/MovieModel";
import { AppDataSource } from "../../0.configs/configFiles/DbConfig";
import { movieService } from "../../3.services/MovieService";
import { logger } from "../../utilities/logger";

async function scrapePopularMovies() {
    try {
        logger.info("Scraping popular movies...");

        let page = 1;
        let totalPages = 1;

        do {
            logger.info(`Scraping page ${page}/${totalPages}`);
            const movieData = await TMDBConfig.getPopularMovies(page);

            totalPages = movieData.total_pages;

            for (const tmdbMovie of movieData.results) {
                // Vérifier si le film existe déjà via le service
                const existingMovie = await movieService.findMovieByTitle(tmdbMovie.title);

                if (!existingMovie) {
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
                    // Ajouter le film via le service
                    const createdMovie = await movieService.createMovie(movie);
                    if (createdMovie) {
                        logger.info(`Added popular movie: ${movie.title}`);
                    } else {
                        logger.error(`Failed to add movie: ${movie.title}`);
                    }
                } else {
                    logger.info(`Movie already exists in the database: ${tmdbMovie.title}`);
                }
            }

            page++;
            // Respecter les limites de l'API avec un délai
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } while (page <= totalPages);

        logger.info("Completed scraping all popular movies.");
    } catch (error) {
        logger.error("Error during popular movies scraping:", error);
    }
}

async function tmdbPopularMoviesDaemon() {
    logger.info("TMDB Popular Movies Daemon: Démarré.");
    await AppDataSource.initialize();

    // Exécuter immédiatement le scraping
    await scrapePopularMovies();

    // Configurer une tâche répétée
    setInterval(async () => {
        await scrapePopularMovies();
    }, 5 * 24 * 60 * 60 * 1000); // 5 jours en millisecondes

    process.stdin.resume(); // Empêche le processus de s'arrêter immédiatement
}

tmdbPopularMoviesDaemon(); // Démarrer le démon
