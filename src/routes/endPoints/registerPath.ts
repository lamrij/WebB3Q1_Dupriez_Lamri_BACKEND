import express, { Request, Response } from 'express';
import { UserController } from '../../controllers/userController';

const registerPath = express.Router();

registerPath.post('/register', (req: Request, res: Response) => {
    // Your code here
    UserController.createUser(req, res);
});

export default registerPath;