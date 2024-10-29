import { AppDataSource } from '../configs/dbConfig'; // Corrigez le chemin si nécessaire
import { User } from '../models/userModel'; // Assurez-vous que le modèle User est correctement importé

export class UserRepository {
    private userRepository = AppDataSource.getRepository(User);

    // Method to create a new user
    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user); // Enregistre l'utilisateur dans la base de données
    }

    // Method to find a user by id
    async findUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id }
        });
    }

    // Method to find a user by username
    async findUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { username }
        });
    }
}
