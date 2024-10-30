import { AppDataSource } from '../configs/dbConfig';
import { User } from '../models/userModel';

export class UserRepository {
    // Method to create a new user
    static async createUser(user: User): Promise<User> {
        return await AppDataSource.getRepository(User).save(user);
    }

    // Method to find a user by id
    static async findUserById(id: number): Promise<User | null> {
        return AppDataSource.getRepository(User).findOne({
            where: { id }
        });
    }

    // Method to find a user by username
    static async findUserByUsername(username: string): Promise<User | null> {
        return AppDataSource.getRepository(User).findOne({
            where: { username }
        });
    }

    // Method to find a user by email
    static async findUserByEmail(email: string): Promise<User | null> {
        return AppDataSource.getRepository(User).findOne({
            where: { email }
        });
    }
}
