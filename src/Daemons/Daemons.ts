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
            const daemonProcess = spawn('ts-node', [daemonPath], {
                detached: false, // Reste lié au processus parent
                stdio: 'inherit', // Hérite des entrées/sorties
            });

            this.daemons.set(file, daemonProcess);
            logger.info(`Démon "${file}" démarré. PID: ${daemonProcess.pid}`);
        });

        // Écoute des signaux pour arrêt propre
        process.on('SIGINT', () => this.stopAllDaemons());
        process.on('SIGTERM', () => this.stopAllDaemons());
    }

    // Méthode pour arrêter tous les démons
    stopAllDaemons() {
        console.log('Arrêt de tous les démons...');
        this.daemons.forEach((process, name) => {
            console.log(`Arrêt du démon "${name}"...`);
            process.kill('SIGINT'); // Envoie un signal d'arrêt
        });
        this.daemons.clear();
        console.log('Tous les démons ont été arrêtés.');
        process.exit(0); // Arrêt du processus principal
    }
}

const daemonManager = new DaemonManager();
export { daemonManager };