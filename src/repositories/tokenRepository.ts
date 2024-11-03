import { AppDataSource } from '../configs/configFiles/dbConfig';
import { Token } from '../models/tokenModel';
import { User } from '../models/userModel';

export class TokenRepository {
    // Method to create a new token and save it to the database
    static async createToken(token: Token): Promise<Token> {
        return await AppDataSource.getRepository(Token).save(token);
    }

    // Method to find a token by its ID
    static async findTokenById(id: number): Promise<Token | null> {
        return AppDataSource.getRepository(Token).findOne({
            where: { id }
        });
    }

    // Method to find a token by its string value
    static async findTokenByTokenString(tokenString: string): Promise<Token | null> {
        return AppDataSource.getRepository(Token).findOne({
            where: { token: tokenString },
            relations: ['user'], // Include user if necessary
        });
    }

    // Method to find all tokens associated with a user
    static async findTokensByUser(user: User): Promise<Token[]> {
        return AppDataSource.getRepository(Token).find({
            where: { user }
        });
    }

    // Method to delete a token by its ID
    static async deleteTokenById(id: number): Promise<void> {
        await AppDataSource.getRepository(Token).delete({ id });
    }

    // Method to delete all tokens associated with a user
    static async deleteTokensByUser(user: User): Promise<void> {
        await AppDataSource.getRepository(Token).delete({ user });
    }

    // Method to revoke a token by its ID
    static async revokeToken(id: number): Promise<void> {
        await AppDataSource.getRepository(Token).update({ id }, { status: 'revoked' });
    }

    // Method to find all tokens in the database
    static async findAllTokens(): Promise<Token[]> {
        return AppDataSource.getRepository(Token).find();
    }
}
