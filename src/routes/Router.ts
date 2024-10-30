
// importation of dependencies
import express, { Request, Response } from 'express';

// importation of all paths

// paths reliated to the user and management 
import testPath from './endPoints/testPath';
import loginPath from './endPoints/loginPath';
import registerPath from './endPoints/registerPath';

// movie routes
import moviesPath from './endPoints/moviesPath';

// setting up the router
const router = express.Router();

// asingning the paths to the router
router.use(testPath);
router.use(loginPath);
router.use(registerPath);
router.use(moviesPath);



export default router;