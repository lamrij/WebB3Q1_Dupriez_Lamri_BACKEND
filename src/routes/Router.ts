
//importation of dependencies
import express, { Request, Response } from 'express';

//importation of all paths
import testPath from './endPoints/testPath';
import loginPath from './endPoints/loginPath';
import moviesPath from './endPoints/moviesPath';
import seriesPath from './endPoints/seriesPath';

//setting up the router
const router = express.Router();

//asingning the paths to the router
router.use(testPath);
router.use(loginPath);
router.use(moviesPath);
router.use(seriesPath);


export default router;