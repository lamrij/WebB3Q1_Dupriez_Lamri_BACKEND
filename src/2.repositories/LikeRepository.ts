import { AppDataSource } from '../0.configs/configFiles/DbConfig';
import { Like } from '../1.models/LikeModel';

class LikeRepository {
    // Méthode pour créer un nouveau like/dislike
    async createLike(like: Like): Promise<Like> {
        return await AppDataSource.getRepository(Like).save(like);
    }

    // Méthode pour trouver un like/dislike par ID
    async findLikeById(id: number): Promise<Like | null> {
        return AppDataSource.getRepository(Like).findOne({
            where: { id },
        });
    }

    // Méthode pour vérifier si un utilisateur a liké/disliké un film
    async findLikeByUserAndMovie(user_id: number, movie_id: number): Promise<Like | null> {
        return AppDataSource.getRepository(Like).findOne({
            where: { user_id, movie_id },
        });
    }

    // Méthode pour obtenir tous les likes/dislikes d'un utilisateur
    async findLikesByUser(user_id: number): Promise<Like[]> {
        return AppDataSource.getRepository(Like).find({
            where: { user_id },
        });
    }

    // Méthode pour obtenir uniquement les likes d'un utilisateur
    async findOnlyLikesByUser(user_id: number): Promise<Like[]> {
        return AppDataSource.getRepository(Like).find({
            where: { user_id, is_like: true },
        });
    }

    // Méthode pour obtenir uniquement les dislikes d'un utilisateur
    async findOnlyDislikesByUser(user_id: number): Promise<Like[]> {
        return AppDataSource.getRepository(Like).find({
            where: { user_id, is_like: false },
        });
    }

    // Méthode pour supprimer un like/dislike par ID
    async deleteLikeById(id: number): Promise<void> {
        await AppDataSource.getRepository(Like).delete(id);
    }
}

const likeRepository: LikeRepository = new LikeRepository();

export { likeRepository };
