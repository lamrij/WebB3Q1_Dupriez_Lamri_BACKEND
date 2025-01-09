import { Request, Response } from 'express';
import { viewService } from '../3.services/ViewService';

class ViewController {
    // Ajouter une vue
    async createView(req: Request, res: Response): Promise<void> {
        const { userId, movieId } = req.body;

        if (!userId || !movieId) {
            res.status(400).json({ success: false, error: 'Invalid input data. userId and movieId are required.' });
            return;
        }

        try {
            const view = await viewService.createView(userId, movieId);
            if (view) {
                res.status(201).json({ success: true, data: view });
            } else {
                res.status(500).json({ success: false, error: 'Failed to create view' });
            }
        } catch (error) {
            console.error('Error creating view:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Récupérer une vue par ID
    async getViewById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request body' });
            return;
        }

        try {
            const view = await viewService.findViewById(Number(id));
            if (view) {
                res.status(200).json({ success: true, data: view });
            } else {
                res.status(404).json({ success: false, error: 'View not found' });
            }
        } catch (error) {
            console.error('Error fetching view by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir toutes les vues d'un utilisateur
    async getViewsByUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ success: false, error: 'User ID is required in the request body' });
            return;
        }

        try {
            const views = await viewService.getViewsByUserId(Number(userId));
            if (views && views.length > 0) {
                res.status(200).json({ success: true, data: views });
            } else {
                res.status(404).json({ success: false, error: 'No views found for the user' });
            }
        } catch (error) {
            console.error('Error fetching views for user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir toutes les vues d'un film
    async getViewsByMovie(req: Request, res: Response): Promise<void> {
        const { movieId } = req.body;

        if (!movieId) {
            res.status(400).json({ success: false, error: 'Movie ID is required in the request body' });
            return;
        }

        try {
            const views = await viewService.getViewsByMovieId(Number(movieId));
            if (views && views.length > 0) {
                res.status(200).json({ success: true, data: views });
            } else {
                res.status(404).json({ success: false, error: 'No views found for the movie' });
            }
        } catch (error) {
            console.error('Error fetching views for movie:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer une vue par ID
    async deleteViewById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request body' });
            return;
        }

        try {
            const success = await viewService.deleteViewById(Number(id));
            if (success) {
                res.status(200).json({ success: true, message: 'View deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'View not found' });
            }
        } catch (error) {
            console.error('Error deleting view by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer toutes les vues d'un utilisateur
    async deleteViewsByUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ success: false, error: 'User ID is required in the request body' });
            return;
        }

        try {
            const success = await viewService.deleteViewsByUserId(Number(userId));
            if (success) {
                res.status(200).json({ success: true, message: 'All views for the user deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'No views found for the user' });
            }
        } catch (error) {
            console.error('Error deleting views for user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer toutes les vues d'un film
    async deleteViewsByMovie(req: Request, res: Response): Promise<void> {
        const { movieId } = req.body;

        if (!movieId) {
            res.status(400).json({ success: false, error: 'Movie ID is required in the request body' });
            return;
        }
        try {
            const success = await viewService.deleteViewsByMovieId(Number(movieId));
            if (success) {
                res.status(200).json({ success: true, message: 'All views for the movie deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'No views found for the movie' });
            }
        } catch (error) {
            console.error('Error deleting views for movie:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

const viewController: ViewController = new ViewController();

export { viewController };
