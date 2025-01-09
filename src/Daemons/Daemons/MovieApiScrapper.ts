import TMDBConfig from "../../0.configs/configFiles/MovieApiConfig";
import { Movie } from "../../1.models/MovieModel";
import { AppDataSource } from "../../0.configs/configFiles/DbConfig";
import { movieService } from "../../3.services/MovieService";
import { logger } from "../../utilities/logger";
import { providerService } from "../../3.services/ProviderService";

// Interfaces pour définir les types des providers
interface ProviderDetails {
    provider_id: number;
    provider_name: string;
    logo_path: string;
    display_priority: number;
}

interface CountryProviders {
    link: string;
    free?: ProviderDetails[];
    buy?: ProviderDetails[];
    rent?: ProviderDetails[];
    flatrate?: ProviderDetails[];
}

interface ProvidersResponse {
    [countryCode: string]: CountryProviders;
}

// Fonction principale pour scraper les films populaires
async function scrapePopularMovies() {
    try {
        logger.info("Scraping popular movies...");

        let page = 1;
        let totalPages = 1;

        do {
            logger.info(`Scraping page ${page}/${totalPages}`);
            const movieData = await TMDBConfig.getPopularMovies(page);

            if (!movieData || !movieData.results) {
                logger.error("No data returned from TMDB API.");
                break;
            }

            totalPages = movieData.total_pages;

            for (const tmdbMovie of movieData.results) {
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

                    const createdMovie = await movieService.createMovie(movie);
                    if (createdMovie) {
                        logger.info(`Added popular movie: ${movie.title}`);

                        // Récupérer les providers pour ce film
                        const providers: ProvidersResponse | null = await TMDBConfig.getMovieProviders(tmdbMovie.id);
                        if (providers) {
                            // Traiter les providers indépendamment de leurs types
                            const providerTypes = ["free", "buy", "rent", "flatrate"] as const;

                            for (const [countryCode, providerData] of Object.entries(providers) as [string, CountryProviders][]) {
                                for (const type of providerTypes) {
                                    const providerList = providerData[type]; // Accès sécurisé grâce au typage
                                    if (providerList) {
                                        for (const provider of providerList) {
                                            // Ajouter le provider dans la base de données si unique
                                            const isAdded = await providerService.createOrUpdateProvider(
                                                createdMovie.id,
                                                provider.provider_name
                                            );
                                            if (isAdded) {
                                                logger.info(
                                                    `Added provider for movie: ${createdMovie.title} - ${provider.provider_name}`
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            logger.warn(`No providers found for movie: ${movie.title}`);
                        }
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

// Fonction pour démarrer le démon de scraping
async function tmdbPopularMoviesDaemon() {
    logger.info("TMDB Popular Movies Daemon: Démarré.");
    try {
        await AppDataSource.initialize();

        // Exécuter immédiatement le scraping
        await scrapePopularMovies();

        // Configurer une tâche répétée
        setInterval(async () => {
            await scrapePopularMovies();
        }, 5 * 24 * 60 * 60 * 1000); // 5 jours en millisecondes
    } catch (error) {
        logger.error("Error initializing the AppDataSource:", error);
    }

    process.stdin.resume(); // Empêche le processus de s'arrêter immédiatement
}

tmdbPopularMoviesDaemon(); // Démarrer le démon
