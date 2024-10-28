import { AppDataSource } from '../configs/dbConfig';
import { User } from '../models/userModel';

export class UserRepository {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(data: Partial<User>) {
        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    // Ajoutez d'autres méthodes (find, update, delete) selon vos besoins
}
