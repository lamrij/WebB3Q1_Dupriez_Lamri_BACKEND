import express, { Request, Response } from 'express';

const seriesPath = express.Router();

seriesPath.get('/series', (req: Request, res: Response) => {
    // Your code here
    res.send('Api is working...');
});

export default seriesPath;