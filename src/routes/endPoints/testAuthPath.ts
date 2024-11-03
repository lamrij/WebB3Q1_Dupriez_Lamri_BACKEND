import express from 'express';
import { TokenUtil } from '../../utilities/tokenUtil';

const testAuthPath = express.Router();

// Route protégée par l'authentification du token
testAuthPath.post('/testAuthPath', TokenUtil.authenticateToken, (req, res) => {
    res.status(200).json({ success: true, message: 'Accès autorisé', user: (req as any).user });
});

export default testAuthPath;
