import { tmdbScraperService } from './TMDBScraperService';
import { logger } from '../utilities/logger';

class InitializationService {

    
    private readonly SCRAPING_INTERVAL = 12 * 60 * 60 * 1000; // 12 heures


    async initializeServices(): Promise<void> {
        try {
            logger.info('Starting initial movie scraping...');
            await tmdbScraperService.scrapeMovies(1);
            logger.info('Initial movie scraping completed.');
            
            this.schedulePeriodicScraping();
        } catch (error) {
            logger.error('Error during initialization:', error);
            throw error;
        }
    }

    private schedulePeriodicScraping(): void {
        setInterval(async () => {
            try {
                if (await tmdbScraperService.shouldUpdateDatabase()) {
                    logger.info('Starting scheduled movie scraping...');
                    await tmdbScraperService.scrapeMovies();
                    logger.info('Scheduled movie scraping completed.');
                }
            } catch (error) {
                logger.error('Error during scheduled scraping:', error);
            }
        }, this.SCRAPING_INTERVAL);
    }
}

const initializationService: InitializationService = new InitializationService();
export {initializationService};