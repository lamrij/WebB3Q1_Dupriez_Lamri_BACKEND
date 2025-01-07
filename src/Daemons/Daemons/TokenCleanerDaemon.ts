import { tokenController } from "../../4.controllers/TokenController";
import { logger } from '../../utilities/logger';
import { AppDataSource } from "../../0.configs/configFiles/DbConfig";
async function tokenCleanerDaemon() {
    logger.info('TokenCleaner: Démarré.');
    AppDataSource.initialize();
    // Configurer une tâche répétée toutes les heures
    setInterval(async () => {
        logger.info('Nettoyage des tokens expirés ou révoqués...');

        try {
            await tokenController.clearExpiredOrRevokedTokens();
            logger.info('Nettoyage des tokens terminé.');
        } catch (error) {
            logger.error(`Erreur lors du nettoyage des tokens`);
        }
    }, 1 * 60 * 60 * 1000); // 15 secondes

    process.stdin.resume(); // Empêche le processus de s'arrêter immédiatement
}

tokenCleanerDaemon(); // Démarrer le démon
