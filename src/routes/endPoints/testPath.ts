import express, { Request, Response } from 'express';

const testPath = express.Router();

// Test path to check if the API is running
testPath.get('/test', (req: Request, res: Response) => {
    const currentTime = new Date().toISOString(); 
    res.json({
        api: 'Api is running',
        message: 'Authorized', 
        status: 'ok',
        time: currentTime 
    });
});

export default testPath;
