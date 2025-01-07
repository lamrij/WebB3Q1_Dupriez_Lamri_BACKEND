import { AppDataSource } from '../0.configs/configFiles/DbConfig';
import { Family } from '../1.models/FamilyModel';

class FamilyRepository {
    // Méthode pour créer une nouvelle famille
    async createFamily(family: Family): Promise<Family> {
        return await AppDataSource.getRepository(Family).save(family);
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
}

const familyRepository: FamilyRepository = new FamilyRepository();

export { familyRepository };
