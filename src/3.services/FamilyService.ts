import { familyRepository } from '../2.repositories/FamilyRepository';
import { Family } from '../1.models/FamilyModel';

class FamilyService {
    // Créer une nouvelle famille
    async createFamily(nom: string, providers: string[] = []): Promise<Family | null> {
        try {
            // Vérifier si une famille avec ce nom existe déjà
            const existingFamily = await familyRepository.findFamilyByName(nom);
            if (existingFamily) {
                console.log('Family with this name already exists.');
                return null;
            }

            // Créer une nouvelle famille
            const newFamily = new Family(nom, providers);
            return await familyRepository.createFamily(newFamily);
        } catch (error) {
            console.error('Error creating family:', error);
            return null;
        }
    }

    // Trouver une famille par ID
    async findFamilyById(id: number): Promise<Family | null> {
        try {
            return await familyRepository.findFamilyById(id);
        } catch (error) {
            console.error('Error finding family by ID:', error);
            return null;
        }
    }

    // Trouver une famille par nom
    async findFamilyByName(nom: string): Promise<Family | null> {
        try {
            return await familyRepository.findFamilyByName(nom);
        } catch (error) {
            console.error('Error finding family by name:', error);
            return null;
        }
    }

    // Obtenir toutes les familles
    async getAllFamilies(): Promise<Family[] | null> {
        try {
            return await familyRepository.findAllFamilies();
        } catch (error) {
            console.error('Error fetching all families:', error);
            return null;
        }
    }

    // Supprimer une famille par ID
    async deleteFamilyById(id: number): Promise<boolean> {
        try {
            await familyRepository.deleteFamilyById(id);
            return true;
        } catch (error) {
            console.error('Error deleting family by ID:', error);
            return false;
        }
    }

    // Ajouter un provider à une famille
    async addProviderToFamily(id: number, provider: string): Promise<Family | null> {
        try {
            return await familyRepository.addProviderToFamily(id, provider);
        } catch (error) {
            console.error('Error adding provider to family:', error);
            return null;
        }
    }

    // Supprimer un provider d'une famille
    async removeProviderFromFamily(id: number, provider: string): Promise<Family | null> {
        try {
            return await familyRepository.removeProviderFromFamily(id, provider);
        } catch (error) {
            console.error('Error removing provider from family:', error);
            return null;
        }
    }

    // Mettre à jour le booléen likeToRewatch pour une famille
    async updateLikeToRewatch(id: number, likeToRewatch: boolean): Promise<Family | null> {
        try {
            return await familyRepository.updateLikeToRewatch(id, likeToRewatch);
        } catch (error) {
            console.error('Error updating likeToRewatch for family:', error);
            return null;
        }
    }

    // Mettre à jour une famille
    async updateFamily(id: number, updatedFields: Partial<Family>): Promise<Family | null> {
        try {
            return await familyRepository.updateFamily(id, updatedFields);
        } catch (error) {
            console.error('Error updating family:', error);
            return null;
        }
    }
}

const familyService: FamilyService = new FamilyService();

export { familyService };
