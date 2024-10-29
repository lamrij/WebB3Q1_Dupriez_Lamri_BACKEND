import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/userModel';
import Hasher from '../services/hasher';

const userRepository = new UserRepository();

export class UserController {
    // Create a new user
    static async createUser(req: Request, res: Response) {
        try {
            var userToAdd : User = req.body;
            var hashedPassword:string  = await Hasher.hash(userToAdd.password);
            userToAdd = new User(userToAdd.firstname, userToAdd.lastname, userToAdd.username,hashedPassword, userToAdd.email, userToAdd.birthdate);
            const user = await userRepository.createUser(userToAdd);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }
    // find a user by id
    static async findUserById(req: Request, res: Response) {
        try {
            const user = await userRepository.findUserById(Number(req.params.id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error finding user' });
        }
    }
    // find a user by username
    static async findUserByUsername(req: Request, res: Response) {
        try {
            const user = await userRepository.findUserByUsername(req.params.username);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error finding user' });
        }
    }
}
