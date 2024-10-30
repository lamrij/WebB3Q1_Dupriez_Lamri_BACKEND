import express from 'express';
import { RegisterService } from '../../services/registerServices';

const registerPath = express.Router();

// Route to register a new user with a POST request
registerPath.post('/register', (req, res) => {
    // Call the register service with req and res
    RegisterService.register(req, res);
});

export default registerPath;
