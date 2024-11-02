import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { TokenController } from '../controllers/tokenController';
import Hasher from '../utils/hasher';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import config from '../configs/config';

export class LoginService {
    // secret key to sign the JWT token
    private static secretKey: string = config.jwtSecret ; // REPLACE WITH A VERY LONG RANDOM STRING

    // method to authenticate a user
    static async authenticate(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user: User | null = await UserController.findUserByEmail(email);
            
            // if the user does not exist, return an error
            if (!user) {
                res.status(404).json({ success: false, error: 'Invalid credentials' });
                return;
            }

            // verify the password using the Hasher utility
            const isPasswordValid = await Hasher.verify(password, user.password);
            
            // verify the password, if it is invalid, return an error
            // return 404 instead of 401 to avoid giving hints about the existence of the email
            if (!isPasswordValid) {
                res.status(404).json({ success: false, error: 'Invalid credentials' });
                return;
            }

            // if the authentication is successful, create a JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, { expiresIn: '3h' });

            // save the token in the database
            const savedToken = await TokenController.createTokenForUser(token, user);
            
            // if the token could not be saved, return an error
            if (!savedToken) {
                console.error('Authentification error, cannot saved the token into the databse, error code : LS1 : token state : ' + savedToken);
            res.status(500).json({ success: false, error: 'Authenification error , error code : LS1 : ' + Date.now() });
                return;
            }

            // return the token to the client
            res.status(200).json({ success: true, token });

        } catch (error) {
            console.error('Authentification error : error code LS2 : ', error);
            res.status(500).json({ success: false, error: 'Authentification error , error code : LS2 : '+ Date.now() });
        }
    }
}
