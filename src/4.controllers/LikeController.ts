import { Request, Response } from 'express';
import { likeService } from '../3.services/LikeService';

class LikeController {
    // Créer un like ou un dislike
    async createLike(req: Request, res: Response): Promise<void> {
        const { user_id, movie_id, is_like } = req.body;

        if (!user_id || !movie_id || is_like === undefined) {
            res.status(400).json({ success: false, error: 'Invalid input data' });
            return;
        }

        try {
            const newLike = await likeService.createLike(user_id, movie_id, is_like);
            if (newLike) {
                res.status(201).json({ success: true, data: newLike });
            } else {
                res.status(500).json({ success: false, error: 'Failed to create like/dislike' });
            }
        } catch (error) {
            console.error('Error creating like/dislike:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Récupérer un like/dislike par ID
    async getLikeById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request body' });
            return;
        }

        try {
            const like = await likeService.findLikeById(Number(id));
            if (like) {
                res.status(200).json({ success: true, data: like });
            } else {
                res.status(404).json({ success: false, error: 'Like/dislike not found' });
            }
        } catch (error) {
            console.error('Error fetching like/dislike by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir tous les likes/dislikes d'un utilisateur
    async getLikesByUser(req: Request, res: Response): Promise<void> {
        const { user_id } = req.body;

        if (!user_id) {
            res.status(400).json({ success: false, error: 'User ID is required in the request body' });
            return;
        }

        try {
            const likes = await likeService.getLikesByUser(Number(user_id));
            if (likes) {
                res.status(200).json({ success: true, data: likes });
            } else {
                res.status(404).json({ success: false, error: 'No likes/dislikes found for the user' });
            }
        } catch (error) {
            console.error('Error fetching likes/dislikes for user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir uniquement les likes d'un utilisateur
    async getOnlyLikesByUser(req: Request, res: Response): Promise<void> {
        const { user_id } = req.body;

        if (!user_id) {
            res.status(400).json({ success: false, error: 'User ID is required in the request body' });
            return;
        }

        try {
            const likes = await likeService.getOnlyLikesByUser(Number(user_id));
            if (likes) {
                res.status(200).json({ success: true, data: likes });
            } else {
                res.status(404).json({ success: false, error: 'No likes found for the user' });
            }
        } catch (error) {
            console.error('Error fetching likes for user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir uniquement les dislikes d'un utilisateur
    async getOnlyDislikesByUser(req: Request, res: Response): Promise<void> {
        const { user_id } = req.body;

        if (!user_id) {
            res.status(400).json({ success: false, error: 'User ID is required in the request body' });
            return;
        }

        try {
            const dislikes = await likeService.getOnlyDislikesByUser(Number(user_id));
            if (dislikes) {
                res.status(200).json({ success: true, data: dislikes });
            } else {
                res.status(404).json({ success: false, error: 'No dislikes found for the user' });
            }
        } catch (error) {
            console.error('Error fetching dislikes for user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer un like/dislike par ID
    async deleteLikeById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request body' });
            return;
        }

        try {
            const success = await likeService.deleteLikeById(Number(id));
            if (success) {
                res.status(200).json({ success: true, message: 'Like/dislike deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'Like/dislike not found' });
            }
        } catch (error) {
            console.error('Error deleting like/dislike by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

const likeController: LikeController = new LikeController();

export { likeController };
