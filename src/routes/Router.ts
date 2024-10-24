
//importation of dependencies
import express, { Request, Response } from 'express';

//importation of all paths
import testPath from './testPath';

//setting up the router
const router = express.Router();

//asingning the paths to the router
router.use(testPath);



export default router;