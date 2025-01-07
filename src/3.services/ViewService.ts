import { viewRepository } from '../2.repositories/ViewRepository';
import { View } from '../1.models/ViewModel';

class ViewService {
    // Ajouter une vue
    async createView(userId: number, movieId: number): Promise<View | null> {
        try {
            const newView = new View(userId, movieId);
            return await viewRepository.createView(newView);
        } catch (error) {
            console.error('Error creating view:', error);
            return null;
        }
    }

    // Trouver une vue par ID
    async findViewById(id: number): Promise<View | null> {
        try {
            return await viewRepository.findViewById(id);
        } catch (error) {
            console.error('Error finding view by ID:', error);
            return null;
        }
    }

    // Obtenir toutes les vues d'un utilisateur
    async getViewsByUserId(userId: number): Promise<View[] | null> {
        try {
            return await viewRepository.findViewsByUserId(userId);
        } catch (error) {
            console.error('Error fetching views for user:', error);
            return null;
        }
    }

    // Obtenir toutes les vues d'un film
    async getViewsByMovieId(movieId: number): Promise<View[] | null> {
        try {
            return await viewRepository.findViewsByMovieId(movieId);
        } catch (error) {
            console.error('Error fetching views for movie:', error);
            return null;
        }
    }

    // Supprimer une vue par ID
    async deleteViewById(id: number): Promise<boolean> {
        try {
            await viewRepository.deleteViewById(id);
            return true;
        } catch (error) {
            console.error('Error deleting view by ID:', error);
            return false;
        }
    }

    // Supprimer toutes les vues d'un utilisateur
    async deleteViewsByUserId(userId: number): Promise<boolean> {
        try {
            await viewRepository.deleteViewsByUserId(userId);
            return true;
        } catch (error) {
            console.error('Error deleting views for user:', error);
            return false;
        }
    }

    // Supprimer toutes les vues d'un film
    async deleteViewsByMovieId(movieId: number): Promise<boolean> {
        try {
            await viewRepository.deleteViewsByMovieId(movieId);
            return true;
        } catch (error) {
            console.error('Error deleting views for movie:', error);
            return false;
        }
    }
}

const viewService: ViewService = new ViewService();

export { viewService };
