import { AppDataSource } from '../configs/configFiles/dbConfig';
import { Token } from '../models/tokenModel';
import { User } from '../models/userModel';

export class TokenRepository {
    // Méthode pour créer un nouveau token et le sauvegarder dans la base de données
    static async createToken(token: Token): Promise<Token> {
        return await AppDataSource.getRepository(Token).save(token);
    }

    // Méthode pour trouver un token par son ID
    static async findTokenById(id: number): Promise<Token | null> {
        return AppDataSource.getRepository(Token).findOne({
            where: { id }
        });
    }

    // Méthode pour trouver un token par sa chaîne de caractères
    static async findTokenByTokenString(tokenString: string): Promise<Token | null> {
        return AppDataSource.getRepository(Token).findOne({
            where: { token: tokenString },
            relations: ['user'], // Si nécessaire, inclure l'utilisateur
        });
    }

    // Méthode pour trouver tous les tokens associés à un utilisateur
    static async findTokensByUser(user: User): Promise<Token[]> {
        return AppDataSource.getRepository(Token).find({
            where: { user }
        });
    }

    // Méthode pour supprimer un token par son ID
    static async deleteTokenById(id: number): Promise<void> {
        await AppDataSource.getRepository(Token).delete({ id });
    }

    // Méthode pour supprimer tous les tokens associés à un utilisateur
    static async deleteTokensByUser(user: User): Promise<void> {
        await AppDataSource.getRepository(Token).delete({ user });
    }

    // Méthode pour révoquer un token par son ID
    static async revokeToken(id: number): Promise<void> {
        await AppDataSource.getRepository(Token).update({ id }, { status: 'revoked' });
    }
}
