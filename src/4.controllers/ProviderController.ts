import { Request, Response } from 'express';
import { providerService } from '../3.services/ProviderService';

class ProviderController {
    // Ajouter ou mettre à jour un fournisseur
    async createProvider(req: Request, res: Response): Promise<void> {
        const { movieId, providerName } = req.body;

        if (!movieId || !providerName) {
            res.status(400).json({ success: false, error: 'Invalid input data. movieId and providerName are required.' });
            return;
        }

        try {
            const provider = await providerService.createOrUpdateProvider(movieId, providerName);
            if (provider) {
                res.status(201).json({ success: true, data: provider });
            } else {
                res.status(500).json({ success: false, error: 'Failed to create or update provider' });
            }
        } catch (error) {
            console.error('Error creating or updating provider:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Récupérer un fournisseur par ID
    async getProviderById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request body' });
            return;
        }

        try {
            const provider = await providerService.findProviderById(Number(id));
            if (provider) {
                res.status(200).json({ success: true, data: provider });
            } else {
                res.status(404).json({ success: false, error: 'Provider not found' });
            }
        } catch (error) {
            console.error('Error fetching provider by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir tous les fournisseurs pour un film
    async getProvidersByMovie(req: Request, res: Response): Promise<void> {
        const { movieId } = req.body;

        if (!movieId) {
            res.status(400).json({ success: false, error: 'Movie ID is required in the request body' });
            return;
        }

        try {
            const providers = await providerService.getProvidersByMovieId(Number(movieId));
            if (providers && providers.length > 0) {
                res.status(200).json({ success: true, data: providers });
            } else {
                res.status(404).json({ success: false, error: 'No providers found for the movie' });
            }
        } catch (error) {
            console.error('Error fetching providers for movie:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    async getAllUniqueProviders(req: Request, res: Response): Promise<void> {
        try {
            const providers = await providerService.getAllUniqueProviders();
    
            if (providers && providers.length > 0) {
                // Retourne directement le tableau des providers
                res.status(200).json(providers);
            } else {
                // Retourne un tableau vide si aucun provider n'est trouvé
                res.status(404).json([]);
            }
        } catch (error) {
            console.error('Error fetching all unique providers:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Supprimer un fournisseur par ID
    async deleteProviderById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request body' });
            return;
        }

        try {
            const success = await providerService.deleteProviderById(Number(id));
            if (success) {
                res.status(200).json({ success: true, message: 'Provider deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'Provider not found' });
            }
        } catch (error) {
            console.error('Error deleting provider by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer tous les fournisseurs associés à un film
    async deleteProvidersByMovie(req: Request, res: Response): Promise<void> {
        const { movieId } = req.body;

        if (!movieId) {
            res.status(400).json({ success: false, error: 'Movie ID is required in the request body' });
            return;
        }

        try {
            const success = await providerService.deleteProvidersByMovieId(Number(movieId));
            if (success) {
                res.status(200).json({ success: true, message: 'All providers for the movie deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'No providers found for the movie' });
            }
        } catch (error) {
            console.error('Error deleting providers for movie:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

const providerController: ProviderController = new ProviderController();

export { providerController };
