import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Token } from '../models/tokenModel';
import { TokenRepository } from '../repositories/tokenRepository';
import config from '../configs/config';
import { User } from '../models/userModel';

export class TokenUtil {
    // Clé secrète pour signer le token JWT
    private static secretKey: string = config.jwtSecret;

    // Méthode pour générer un token JWT
    static generateToken(payload: object, expiresIn: string = '3h'): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    // Méthode pour vérifier un token JWT
    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            console.error('Échec de la vérification du token:', error);
            throw new Error('Token invalide ou expiré');
        }
    }

    // Middleware pour authentifier un token
    static async authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers['authorization'];
        const tokenString = authHeader && authHeader.split(' ')[1]; // Format attendu : "Bearer <token>"

        if (!tokenString) {
            res.status(401).json({ success: false, error: 'Le token d\'accès est manquant ou invalide' });
            return;
        }

        try {
            // Appel de la méthode verifyToken en utilisant TokenUtil
            const decoded = TokenUtil.verifyToken(tokenString);

            // Récupération du token dans la base de données
            const tokenRecord = await TokenRepository.findTokenByTokenString(tokenString);

            if (!tokenRecord) {
                res.status(401).json({ success: false, error: 'Token introuvable ou révoqué' });
                return;
            }

            // Vérification du statut du token
            if (tokenRecord.status !== 'valid') {
                res.status(401).json({ success: false, error: 'Le token a été révoqué' });
                return;
            }

            // Vérification de l'expiration du token
            if (tokenRecord.expiresAt < new Date()) {
                res.status(401).json({ success: false, error: 'Le token a expiré' });
                return;
            }

            // Attacher les données du token décodé à la requête
            (req as any).user = decoded;

            // Passer au middleware suivant
            next();
        } catch (error) {
            console.error('Échec de l\'authentification du token:', error);
            res.status(403).json({ success: false, error: 'Token invalide' });
        }
    }

    // Method to save a token in the database
    static async saveToken(token: string, user: User, expiresInHours: number = 3): Promise<Token | null> {
        const tokenEntity = new Token();
        tokenEntity.token = token;
        tokenEntity.user = user;
        tokenEntity.expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000); // Définissez l'expiration ici
        tokenEntity.status = 'valid';

        try {
            return await TokenRepository.createToken(tokenEntity);
        } catch (error) {
            console.error('Error saving token:', error);
            return null;
        }
    }

    // Method to find a token by its ID
    static async findTokenById(id: number): Promise<Token | null> {
        return await TokenRepository.findTokenById(id);
    }

    // Method to find all tokens associated with a user
    static async findTokensByUser(user: User): Promise<Token[]> {
        return await TokenRepository.findTokensByUser(user);
    }

    // Method to delete a token by its ID
    static async deleteTokenById(id: number): Promise<void> {
        await TokenRepository.deleteTokenById(id);
    }

    // Method to delete all tokens associated with a user
    static async deleteTokensByUser(user: User): Promise<void> {
        await TokenRepository.deleteTokensByUser(user);
    }

    // Method to revoke a token by its ID
    static async revokeTokenById(id: number): Promise<void> {
        try {
            await TokenRepository.revokeToken(id);
        } catch (error) {
            console.error('Error revoking token:', error);
        }
    }
}
