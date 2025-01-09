import { Request, Response } from 'express';
import { familyService } from '../3.services/FamilyService';
import { userService } from '../3.services/UserService';
import SendUser from '../1.models/SendableUser';

class FamilyController {
    // Créer une nouvelle famille
    async createFamily(req: Request, res: Response): Promise<void> {
        const { nom, providers } = req.body;

        if (!nom) {
            res.status(400).json({ success: false, error: 'Family name is required in the request body' });
            return;
        }

        try {
            const newFamily = await familyService.createFamily(nom, providers || []);
            if (newFamily) {
                res.status(201).json({ success: true, familyId: newFamily.id });
            } else {
                res.status(500).json({ success: false, error: 'Failed to create family' });
            }
        } catch (error) {
            console.error('Error creating family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Ajouter un provider à une famille
    async addProviderToFamily(req: Request, res: Response): Promise<void> {
        const { familyId, provider } = req.body;

        if (!familyId || !provider) {
            res.status(400).json({ success: false, error: 'Family ID and provider are required in the request body' });
            return;
        }

        try {
            const updatedFamily = await familyService.addProviderToFamily(Number(familyId), provider);
            if (updatedFamily) {
                res.status(200).json({ success: true, data: updatedFamily });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error adding provider to family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer un provider d'une famille
    async removeProviderFromFamily(req: Request, res: Response): Promise<void> {
        const { familyId, provider } = req.body;

        if (!familyId || !provider) {
            res.status(400).json({ success: false, error: 'Family ID and provider are required in the request body' });
            return;
        }

        try {
            const updatedFamily = await familyService.removeProviderFromFamily(Number(familyId), provider);
            if (updatedFamily) {
                res.status(200).json({ success: true, data: updatedFamily });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error removing provider from family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Mettre à jour le booléen likeToRewatch
    async updateLikeToRewatch(req: Request, res: Response): Promise<void> {
        const { familyId, likeToRewatch } = req.body;

        if (familyId === undefined || likeToRewatch === undefined) {
            res.status(400).json({ success: false, error: 'Family ID and likeToRewatch are required in the request body' });
            return;
        }

        try {
            const updatedFamily = await familyService.updateLikeToRewatch(Number(familyId), likeToRewatch);
            if (updatedFamily) {
                res.status(200).json({ success: true, data: updatedFamily });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error updating likeToRewatch:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Mettre à jour une famille
    async updateFamily(req: Request, res: Response): Promise<void> {
        const { familyId, updatedFields } = req.body;

        if (!familyId || !updatedFields) {
            res.status(400).json({ success: false, error: 'Family ID and updated fields are required in the request body' });
            return;
        }

        try {
            const updatedFamily = await familyService.updateFamily(Number(familyId), updatedFields);
            if (updatedFamily) {
                res.status(200).json({ success: true, data: updatedFamily });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error updating family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Supprimer une famille par ID
    async deleteFamilyById(req: Request, res: Response): Promise<void> {
        const { familyId } = req.body;

        if (!familyId) {
            res.status(400).json({ success: false, error: 'Family ID is required in the request body' });
            return;
        }

        try {
            const success = await familyService.deleteFamilyById(Number(familyId));
            if (success) {
                res.status(200).json({ success: true, message: 'Family deleted successfully' });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error deleting family by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Obtenir toutes les familles
    async getAllFamilies(req: Request, res: Response): Promise<void> {
        try {
            const families = await familyService.getAllFamilies();
            if (families) {
                res.status(200).json({ success: true, data: families });
            } else {
                res.status(404).json({ success: false, error: 'No families found' });
            }
        } catch (error) {
            console.error('Error fetching all families:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Récupérer une famille par ID
    async getFamilyById(req: Request, res: Response): Promise<void> {
        const { familyId } = req.body;
    
        if (!familyId) {
            res.status(400).json({ error: 'Family ID is required in the request body' });
            return;
        }
    
        try {
            const family = await familyService.findFamilyById(Number(familyId));
            if (family) {
                res.status(200).json(family); // Renvoyer directement les données de la famille
            } else {
                res.status(404).json({ error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error fetching family by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    

    async setUserFamily(req: Request, res: Response): Promise<void> {
    const { userId, familyId } = req.body;
    console.log('userId', userId);

    // Validation des paramètres requis
    if (!userId || !familyId) {
        console.error('User ID and Family ID are required in the request body');
        res.status(400).json({
            success: false,
            error: 'User ID and Family ID are required in the request body',
        });
        return; // Ajout d'un return pour éviter que le code continue
    }

    try {
        // Appelle la méthode pour mettre à jour la famille de l'utilisateur
        await userService.setUserFamily(Number(userId), Number(familyId));

        // Envoie une réponse de succès
        res.status(200).json({
            success: true,
            message: 'User family updated successfully',
        });
        return; // Ajout d'un return ici pour s'assurer qu'aucune autre réponse n'est envoyée
    } catch (error) {
        // Capture et journalise les erreurs
        console.error('Error updating user family:', error);

        // Envoie une réponse d'erreur
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
        return; // Ajout d'un return pour empêcher d'autres exécutions
    }
}


    async getUsersInFamily(req: Request, res: Response): Promise<void> {
        const { familyId } = req.body;

        if (!familyId) {
            res.status(400).json({ error: 'Family ID is required in the request body' });
            return;
        }

        try {
            // Récupère les utilisateurs de la base de données via TypeORM
            const users = await userService.getUsersInFamily(Number(familyId));
            
            if(users !== null) {
                // Mappe chaque utilisateur de l'entité `User` vers la classe simplifiée
                const mappedUsers = users.map((user) => new SendUser(
                    user.id,
                    user.email,
                    user.username,
                    user.family
                ));
                res.status(200).json(mappedUsers); // Renvoie les utilisateurs mappés
            } else {
                res.status(404).json([]); // Renvoie un tableau vide si aucun utilisateur
            }
        } catch (error) {
            console.error('Error fetching users in family:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

const familyController: FamilyController = new FamilyController();

export { familyController };
