import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/userModel';

export class UserController {
    // Create a new user
    static async createUser(userData: User): Promise<User | null> {
        try {
            const user = await UserRepository.createUser(userData);
            return user; // Return the user object
        } catch (error) {
            console.error('Error creating user:', error);
            return null; 
        }
    }

    // Find a user by id
    static async findUserById(id: number): Promise<User | null> {
        try {
            return await UserRepository.findUserById(id);
        } catch (error) {
            console.error('Error finding user by ID:', error);
            return null; 
        }
    }

    // Find a user by username
    static async findUserByUsername(username: string): Promise<User | null> {
        try {
            return await UserRepository.findUserByUsername(username);
        } catch (error) {
            console.error('Error finding user by username:', error);
            return null; 
        }
    }

    // Find a user by email
    static async findUserByEmail(email: string): Promise<User | null> {
        try {
            return await UserRepository.findUserByEmail(email);
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null; 
        }
    }
}
