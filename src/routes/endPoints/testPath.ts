import express, { Request, Response } from 'express';
import { TokenUtil } from '../../utilities/tokenUtil';

const testPath = express.Router();

// Test path to check if the API is running
testPath.get('/test', (req: Request, res: Response) => {
    const currentTime = new Date().toISOString(); 
    res.json({
        success: true,
        api: 'Api is running',
        message: 'Authorized', 
        status: 'ok',
        time: currentTime 
    });
});
// path to test the authentication
testPath.post('/test', TokenUtil.authenticateToken, (req, res) => {
    const currentTime = new Date().toISOString(); 
    res.status(200).json({ 
        success: true, 
        status: 'You reached the protected route',
        time: currentTime,
        message: 'Access granted', 
        user: (req as any).user });
});
export default testPath;
