import express, { Request, Response } from 'express';

const loginPath = express.Router();

loginPath.get('/login', (req: Request, res: Response) => {
    // Your code here
    res.send('Login is working...');
});

export default loginPath;