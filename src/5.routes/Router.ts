
// importation of dependencies
import express, { Request, Response } from 'express';

// importation of all paths

// paths reliated to the user and management 
import testPath from './endPoints/TestPath';
import loginPath from './endPoints/LoginPath';
import registerPath from './endPoints/RegisterPath';

// movie routes
import moviesPath from './endPoints/MoviesPath';

// setting up the router
const router = express.Router();

// asingning the paths to the router
router.use(testPath);
router.use(loginPath);
router.use(registerPath);
router.use(moviesPath);



export default router;