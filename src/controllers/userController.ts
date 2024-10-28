import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';

const userRepository = new UserRepository();

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const user = await userRepository.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    // Ajoutez d'autres méthodes pour gérer les utilisateurs (find, update, delete)
}
