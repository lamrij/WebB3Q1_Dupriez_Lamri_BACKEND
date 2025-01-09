import { AppDataSource } from '../0.configs/configFiles/DbConfig';
import { Family } from '../1.models/FamilyModel';

class FamilyRepository {
    // Méthode pour créer une nouvelle famille
    async createFamily(family: Family): Promise<Family> {
        return await AppDataSource.getRepository(Family).save(family);
    }

    // Méthode pour mettre à jour une famille
    async updateFamily(id: number, updatedFields: Partial<Family>): Promise<Family | null> {
        const repository = AppDataSource.getRepository(Family);
        const family = await repository.findOne({ where: { id } });

        if (!family) return null;

        Object.assign(family, updatedFields); // Appliquer les changements
        return await repository.save(family); // Sauvegarder les modifications
    }

    // Méthode pour trouver une famille par ID
    async findFamilyById(id: number): Promise<Family | null> {
        return AppDataSource.getRepository(Family).findOne({
            where: { id },
        });
    }

    // Méthode pour trouver une famille par nom
    async findFamilyByName(nom: string): Promise<Family | null> {
        return AppDataSource.getRepository(Family).findOne({
            where: { nom },
        });
    }

    // Méthode pour obtenir toutes les familles
    async findAllFamilies(): Promise<Family[]> {
        return AppDataSource.getRepository(Family).find();
    }

    // Méthode pour supprimer une famille par ID
    async deleteFamilyById(id: number): Promise<void> {
        await AppDataSource.getRepository(Family).delete(id);
    }

    // Ajouter un provider à une famille
    async addProviderToFamily(id: number, provider: string): Promise<Family | null> {
        const repository = AppDataSource.getRepository(Family);
        const family = await repository.findOne({ where: { id } });

        if (!family) return null;

        if (!family.providers.includes(provider)) {
            family.providers.push(provider);
            return await repository.save(family); // Sauvegarder les modifications
        }

        return family; // Le provider existe déjà, aucun changement
    }

    // Supprimer un provider d'une famille
    async removeProviderFromFamily(id: number, provider: string): Promise<Family | null> {
        const repository = AppDataSource.getRepository(Family);
        const family = await repository.findOne({ where: { id } });

        if (!family) return null;

        family.providers = family.providers.filter((p) => p !== provider);
        return await repository.save(family);
    }

    // Mettre à jour le booléen likeToRewatch pour une famille
    async updateLikeToRewatch(id: number, likeToRewatch: boolean): Promise<Family | null> {
        const repository = AppDataSource.getRepository(Family);
        const family : Family | null = await repository.findOne({ where: { id } });

        if (!family) return null;

        family.likeToRewatch = likeToRewatch;
        return await repository.save(family);
    }
}

const familyRepository: FamilyRepository = new FamilyRepository();

export { familyRepository };
