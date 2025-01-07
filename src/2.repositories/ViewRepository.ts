import { AppDataSource } from '../0.configs/configFiles/DbConfig';
import { View } from '../1.models/ViewModel';

class ViewRepository {
    // Méthode pour créer une nouvelle vue
    async createView(view: View): Promise<View> {
        return await AppDataSource.getRepository(View).save(view);
    }

    // Méthode pour trouver une vue par ID
    async findViewById(id: number): Promise<View | null> {
        return AppDataSource.getRepository(View).findOne({
            where: { id },
        });
    }

    // Méthode pour trouver toutes les vues d'un utilisateur par son ID
    async findViewsByUserId(userId: number): Promise<View[]> {
        return AppDataSource.getRepository(View).find({
            where: { userId },
        });
    }

    // Méthode pour trouver toutes les vues d'un film par son ID
    async findViewsByMovieId(movieId: number): Promise<View[]> {
        return AppDataSource.getRepository(View).find({
            where: { movieId },
        });
    }

    // Méthode pour supprimer une vue par ID
    async deleteViewById(id: number): Promise<void> {
        await AppDataSource.getRepository(View).delete(id);
    }

    // Méthode pour supprimer toutes les vues associées à un utilisateur
    async deleteViewsByUserId(userId: number): Promise<void> {
        await AppDataSource.getRepository(View).delete({ userId });
    }

    // Méthode pour supprimer toutes les vues associées à un film
    async deleteViewsByMovieId(movieId: number): Promise<void> {
        await AppDataSource.getRepository(View).delete({ movieId });
    }
}

const viewRepository: ViewRepository = new ViewRepository();

export { viewRepository };
