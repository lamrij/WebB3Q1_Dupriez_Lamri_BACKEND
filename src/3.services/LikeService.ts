import { likeRepository } from '../2.repositories/LikeRepository';
import { Like } from '../1.models/LikeModel';

class LikeService {
    // Créer un nouveau like ou dislike
    async createLike(user_id: number, movie_id: number, is_like: boolean): Promise<Like | null> {
        try {
            // Vérifier si un like/dislike existe déjà pour cet utilisateur et ce film
            const existingLike = await likeRepository.findLikeByUserAndMovie(user_id, movie_id);

            if (existingLike) {
                // Si un enregistrement existe déjà, on met simplement à jour le champ `is_like`
                existingLike.is_like = is_like;
                return await likeRepository.createLike(existingLike);
            }

            // Créer un nouvel enregistrement si aucun n'existe
            const newLike = new Like(user_id, movie_id, is_like);
            return await likeRepository.createLike(newLike);
        } catch (error) {
            console.error('Error creating like/dislike:', error);
            return null;
        }
    }

    // Trouver un like/dislike par ID
    async findLikeById(id: number): Promise<Like | null> {
        try {
            return await likeRepository.findLikeById(id);
        } catch (error) {
            console.error('Error finding like by ID:', error);
            return null;
        }
    }

    // Obtenir tous les likes/dislikes d'un utilisateur
    async getLikesByUser(user_id: number): Promise<Like[] | null> {
        try {
            return await likeRepository.findLikesByUser(user_id);
        } catch (error) {
            console.error('Error fetching likes/dislikes for user:', error);
            return null;
        }
    }

    // Obtenir uniquement les likes d'un utilisateur
    async getOnlyLikesByUser(user_id: number): Promise<Like[] | null> {
        try {
            return await likeRepository.findOnlyLikesByUser(user_id);
        } catch (error) {
            console.error('Error fetching likes for user:', error);
            return null;
        }
    }

    // Obtenir uniquement les dislikes d'un utilisateur
    async getOnlyDislikesByUser(user_id: number): Promise<Like[] | null> {
        try {
            return await likeRepository.findOnlyDislikesByUser(user_id);
        } catch (error) {
            console.error('Error fetching dislikes for user:', error);
            return null;
        }
    }

    // Supprimer un like/dislike par ID
    async deleteLikeById(id: number): Promise<boolean> {
        try {
            await likeRepository.deleteLikeById(id);
            return true;
        } catch (error) {
            console.error('Error deleting like/dislike by ID:', error);
            return false;
        }
    }
}

const likeService: LikeService = new LikeService();

export { likeService };
