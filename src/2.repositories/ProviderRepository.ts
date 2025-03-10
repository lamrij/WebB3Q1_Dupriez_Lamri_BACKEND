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
    // Méthode pour récupérer tous les fournisseurs uniques par leur nom
    async findUniqueProviders(): Promise<Provider[]> {
        const queryBuilder = AppDataSource.getRepository(Provider).createQueryBuilder('provider');

        // Utilisation de DISTINCT pour éliminer les doublons basés sur le nom du fournisseur
        const uniqueProviders = await queryBuilder
            .select('DISTINCT provider.provider', 'provider_name')
            .addSelect('provider.id', 'id')
            .addSelect('provider.movieId', 'movieId')
            .getRawMany();

        // Mapper les résultats pour correspondre au modèle Provider
        return uniqueProviders.map((result) => {
            const provider = new Provider(result.movieId, result.provider_name);
            provider.id = result.id;
            return provider;
        });
    }
    // Méthode pour récupérer tous les fournisseurs uniques pour un certain film
    async findUniqueProvidersByMovieId(movieId: number): Promise<Provider[]> {
        const queryBuilder = AppDataSource.getRepository(Provider).createQueryBuilder('provider');

        // Utilisation de DISTINCT pour éliminer les doublons sur le nom du provider
        const uniqueProviders = await queryBuilder
            .select('DISTINCT provider.provider', 'provider_name')
            .addSelect('provider.id', 'id')
            .addSelect('provider.movieId', 'movieId')
            .where('provider.movieId = :movieId', { movieId })
            .getRawMany();

        // Mapper les résultats pour correspondre au modèle Provider
        return uniqueProviders.map((result) => {
            const provider = new Provider(result.movieId, result.provider_name);
            provider.id = result.id;
            return provider;
        });
    }


}

const providerRepository: ProviderRepository = new ProviderRepository();

export { providerRepository };
