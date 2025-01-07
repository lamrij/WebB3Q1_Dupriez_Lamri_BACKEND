import { AppDataSource } from '../0.configs/configFiles/DbConfig';
import { Provider } from '../1.models/ProviderModel';

class ProviderRepository {
    // Méthode pour créer un nouveau fournisseur
    async createProvider(provider: Provider): Promise<Provider> {
        return await AppDataSource.getRepository(Provider).save(provider);
    }

    // Méthode pour trouver un fournisseur par ID
    async findProviderById(id: number): Promise<Provider | null> {
        return AppDataSource.getRepository(Provider).findOne({
            where: { id },
        });
    }

    // Méthode pour trouver les fournisseurs d'un film par son ID
    async findProvidersByMovieId(movieId: number): Promise<Provider[]> {
        return AppDataSource.getRepository(Provider).find({
            where: { movieId },
        });
    }

    // Méthode pour trouver un fournisseur spécifique pour un film
    async findProviderByMovieAndName(movieId: number, provider: string): Promise<Provider | null> {
        return AppDataSource.getRepository(Provider).findOne({
            where: { movieId, provider },
        });
    }

    // Méthode pour supprimer un fournisseur par ID
    async deleteProviderById(id: number): Promise<void> {
        await AppDataSource.getRepository(Provider).delete(id);
    }

    // Méthode pour supprimer tous les fournisseurs associés à un film
    async deleteProvidersByMovieId(movieId: number): Promise<void> {
        await AppDataSource.getRepository(Provider).delete({ movieId });
    }
}

const providerRepository: ProviderRepository = new ProviderRepository();

export { providerRepository };
