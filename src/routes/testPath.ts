import express, { Request, Response } from 'express';

const testPath = express.Router();

testPath.get('/test', (req: Request, res: Response) => {
    // Your code here
    res.send('Api is working...');
});

export default testPath;