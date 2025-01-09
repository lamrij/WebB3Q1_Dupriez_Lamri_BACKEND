import { providerRepository } from '../2.repositories/ProviderRepository';
import { Provider } from '../1.models/ProviderModel';

class ProviderService {
    // Ajouter ou mettre à jour un fournisseur pour un film
    async createOrUpdateProvider(movieId: number, providerName: string): Promise<Provider | null> {
        try {
            // Vérifier si un fournisseur existe déjà pour ce film et ce nom
            const existingProvider = await providerRepository.findProviderByMovieAndName(movieId, providerName);

            if (existingProvider) {
                // Si un fournisseur existe déjà, on ne fait rien ou on peut mettre à jour des champs si besoin
                return existingProvider;
            }

            // Créer un nouveau fournisseur si aucun n'existe
            const newProvider = new Provider(movieId, providerName);
            return await providerRepository.createProvider(newProvider);
        } catch (error) {
            console.error('Error creating or updating provider:', error);
            return null;
        }
    }

    // Trouver un fournisseur par ID
    async findProviderById(id: number): Promise<Provider | null> {
        try {
            return await providerRepository.findProviderById(id);
        } catch (error) {
            console.error('Error finding provider by ID:', error);
            return null;
        }
    }

    // Supprimer un fournisseur par ID
    async deleteProviderById(id: number): Promise<boolean> {
        try {
            await providerRepository.deleteProviderById(id);
            return true;
        } catch (error) {
            console.error('Error deleting provider by ID:', error);
            return false;
        }
    }

    // Supprimer tous les fournisseurs associés à un film
    async deleteProvidersByMovieId(movieId: number): Promise<boolean> {
        try {
            await providerRepository.deleteProvidersByMovieId(movieId);
            return true;
        } catch (error) {
            console.error('Error deleting providers for movie:', error);
            return false;
        }
    }


    // Obtenir tous les fournisseurs associés à un film
    async getProvidersByMovieId(movieId: number): Promise<Provider[] | null> {
        try {
            return await providerRepository.findProvidersByMovieId(movieId);
        } catch (error) {
            console.error('Error fetching providers for movie:', error);
            return null;
        }
    }
    // Obtenir tous les fournisseurs uniques dans la base de données
    async getAllUniqueProviders(): Promise<Provider[] | null> {
        try {
            return await providerRepository.findUniqueProviders();
        } catch (error) {
            console.error('Error fetching all unique providers:', error);
            return null;
        }
    }
}

const providerService: ProviderService = new ProviderService();

export { providerService };
