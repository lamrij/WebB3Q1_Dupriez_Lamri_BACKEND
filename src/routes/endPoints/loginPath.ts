import express, { Request, Response } from 'express';

const LoginPath = express.Router();

LoginPath.get('/login', (req: Request, res: Response) => {
    // Your code here
    res.send('Login is working...');
});

export default LoginPath;