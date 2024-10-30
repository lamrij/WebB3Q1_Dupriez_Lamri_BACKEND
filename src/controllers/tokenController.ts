import { TokenRepository } from '../repositories/tokenRepository';
import { Token } from '../models/tokenModel';
import { User } from '../models/userModel';

export class TokenController {
    // Create a new token for a user in the database
    static async createTokenForUser(tokenData: string, user: User): Promise<Token | null> {
        try {
            const token = new Token();
            token.token = tokenData;
            token.user = user;
             // Save the token to the database and return the token object
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
            return true; // Token deleted successfully
        } catch (error) {
            console.error('Error deleting token by ID:', error);
            return false; 
        }
    }

    // Delete all tokens associated with a user
    static async deleteTokensByUser(user: User): Promise<boolean> {
        try {
            await TokenRepository.deleteTokensByUser(user);
            return true; // All tokens deleted successfully
        } catch (error) {
            console.error('Error deleting tokens for user:', error);
            return false; 
        }
    }
}
