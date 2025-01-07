import { familyRepository } from '../2.repositories/FamilyRepository';
import { Family } from '../1.models/FamilyModel';

class FamilyService {
    // Créer une nouvelle famille
    async createFamily(nom: string): Promise<Family | null> {
        try {
            // Vérifier si une famille avec ce nom existe déjà
            const existingFamily = await familyRepository.findFamilyByName(nom);
            if (existingFamily) {
                // Si une famille existe déjà avec ce nom, retourner null
                console.log('Family with this name already exists.');
                return null;
            }

            // Créer une nouvelle famille si elle n'existe pas
            const newFamily = new Family(nom);
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
}

const familyService: FamilyService = new FamilyService();

export { familyService };
