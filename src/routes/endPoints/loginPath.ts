import express from 'express';
import { LoginService } from '../../services/loginService';

const loginPath = express.Router();

// Route to authenticate a user with a POST request
loginPath.post('/login', (req, res) => {
    // Call the Login service with req and res
    LoginService.authenticate(req, res); 
});

export default loginPath;
