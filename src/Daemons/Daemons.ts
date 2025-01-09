import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs';
import { logger } from '../utilities/logger';

class DaemonManager {
    private daemons: Map<string, ChildProcess> = new Map();

    // Méthode pour démarrer tous les démons
    startDaemons() {
        const daemonFiles = fs.readdirSync(path.join(__dirname, 'Daemons'));

        daemonFiles.forEach((file) => {
            const daemonPath = path.join(__dirname, 'Daemons', file);

            // Lancer chaque démon dans un sous-processus
            const daemonProcess = spawn('npx', ['ts-node', daemonPath], {
                detached: false,
                stdio: 'inherit',
                shell: true, // Important pour Windows
            });

            // Gérer les erreurs des démons
            daemonProcess.on('error', (err) => {
                logger.error(`Erreur lors du démarrage du démon "${file}": ${err.message}`);
            });

            // Gérer la fermeture du processus démon
            daemonProcess.on('exit', (code, signal) => {
                logger.warn(`Démon "${file}" arrêté avec le code ${code} et le signal ${signal}`);
                this.daemons.delete(file);
            });

            this.daemons.set(file, daemonProcess);
            logger.info(`Démon "${file}" démarré. PID: ${daemonProcess.pid}`);
        });

        // Gestion des signaux pour arrêt propre
        process.on('SIGINT', () => this.gracefulShutdown());
        process.on('SIGTERM', () => this.gracefulShutdown());

        // Enregistrer un gestionnaire d'arrêt forcé
        process.on('uncaughtException', (err) => {
            logger.error(`Exception non interceptée : ${err.message}`);
            this.gracefulShutdown();
        });

        process.on('unhandledRejection', (reason, promise) => {
            logger.error(`Promesse non gérée : ${reason}`);
            this.gracefulShutdown();
        });
    }

    // Méthode pour arrêter tous les démons
    stopAllDaemons() {
        logger.info('Arrêt de tous les démons...');
        this.daemons.forEach((daemonProcess, name) => {
            logger.info(`Arrêt du démon "${name}" (PID: ${daemonProcess.pid})...`);
            daemonProcess.kill('SIGINT'); // Envoie un signal d'arrêt propre
        });
        this.daemons.clear();
        logger.info('Tous les démons ont été arrêtés.');
    }

    // Méthode pour une fermeture propre du processus principal
    gracefulShutdown() {
        logger.info('Arrêt du serveur principal...');
        this.stopAllDaemons();
        process.exit(0); // Terminer le processus principal
    }
}

// Instance unique de DaemonManager
const daemonManager = new DaemonManager();
export { daemonManager };
