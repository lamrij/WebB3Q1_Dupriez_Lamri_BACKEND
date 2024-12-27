import { Request, Response } from 'express';
import { familyService } from '../3.services/FamilyService';
import { userService } from '../3.services/UserService';

class FamilyController {
    // Créer une nouvelle famille
    async createFamily(req: Request, res: Response): Promise<void> {
        const { nom } = req.body;

        if (!nom) {
            res.status(400).json({ success: false, error: 'Family name is required in the request body' });
            return;
        }

        try {
            const newFamily = await familyService.createFamily(nom);
            if (newFamily) {
                res.status(201).json({ success: true, data: newFamily });
            } else {
                res.status(500).json({ success: false, error: 'Failed to create family' });
            }
        } catch (error) {
            console.error('Error creating family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Récupérer une famille par ID
    async getFamilyById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request parameters' });
            return;
        }

        try {
            const family = await familyService.findFamilyById(Number(id));
            if (family) {
                res.status(200).json({ success: true, data: family });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error fetching family by ID:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // Récupérer une famille par nom
    async getFamilyByName(req: Request, res: Response): Promise<void> {
        const { nom } = req.body;

        if (!nom) {
            res.status(400).json({ success: false, error: 'Family name is required in the request parameters' });
            return;
        }

        try {
            const family = await familyService.findFamilyByName(nom);
            if (family) {
                res.status(200).json({ success: true, data: family });
            } else {
                res.status(404).json({ success: false, error: 'Family not found' });
            }
        } catch (error) {
            console.error('Error fetching family by name:', error);
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

    // Supprimer une famille par ID
    async deleteFamilyById(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: 'ID is required in the request parameters' });
            return;
        }

        try {
            const success = await familyService.deleteFamilyById(Number(id));
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

    async setUserFamily(req: Request, res: Response): Promise<void> {
        const { userId, familyId } = req.body;

        if (!userId || !familyId) {
            res.status(400).json({ success: false, error: 'User ID and Family ID are required in the request body' });
            return;
        }

        try {
            await userService.setUserFamily(Number(userId), Number(familyId));
            res.status(200).json({ success: true, message: 'User family updated successfully' });
        } catch (error) {
            console.error('Error updating user family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    async getUsersInFamily(req: Request, res: Response): Promise<void> {
        const { familyId } = req.body;

        if (!familyId) {
            res.status(400).json({ success: false, error: 'Family ID is required in the request parameters' });
            return;
        }

        try {
            const users = await userService.getUsersInFamily(Number(familyId));
            if (users) {
                res.status(200).json({ success: true, data: users });
            } else {
                res.status(404).json({ success: false, error: 'No users found in family' });
            }
        } catch (error) {
            console.error('Error fetching users in family:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

const familyController: FamilyController = new FamilyController();

export { familyController };
