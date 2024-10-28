import express, { Request, Response } from 'express';

const moviesPath = express.Router();

moviesPath.get('/movies', (req: Request, res: Response) => {
    // Your code here
    res.send('Api is working...');
});

export default moviesPath;