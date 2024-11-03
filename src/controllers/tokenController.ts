import { TokenRepository } from '../repositories/tokenRepository';
import { Token } from '../models/tokenModel';
import { User } from '../models/userModel';

export class TokenController {
    // Create a new token for a user in the database
    static async createTokenForUser(tokenData: string, user: User, expiresInHours: number = 3): Promise<Token | null> {
        try {
            const token = new Token();
            token.token = tokenData;
            token.user = user;
            token.expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
            token.status = 'valid';
            
            return await TokenRepository.createToken(token);
        } catch (error) {
            console.error('Error creating token:', error);
            return null;
        }
    }

    // Find a token by ID
    static async findTokenById(id: number): Promise<Token | null> {
        try {
            return await TokenRepository.findTokenById(id);
        } catch (error) {
            console.error('Error finding token by ID:', error);
            return null;
        }
    }

    // Find all tokens associated with a user
    static async findTokensByUser(user: User): Promise<Token[] | null> {
        try {
            return await TokenRepository.findTokensByUser(user);
        } catch (error) {
            console.error('Error finding tokens for user:', error);
            return null;
        }
    }

    // Delete a token by ID
    static async deleteTokenById(id: number): Promise<boolean> {
        try {
            await TokenRepository.deleteTokenById(id);
            return true;
        } catch (error) {
            console.error('Error deleting token by ID:', error);
            return false;
        }
    }

    // Delete all tokens associated with a user
    static async deleteTokensByUser(user: User): Promise<boolean> {
        try {
            await TokenRepository.deleteTokensByUser(user);
            return true;
        } catch (error) {
            console.error('Error deleting tokens for user:', error);
            return false;
        }
    }
}
