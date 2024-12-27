
// importation of dependencies
import express, { Request, Response } from 'express';

// importation of all paths


// paths reliated to the user and management
import testPath from './endPoints/TestPath';
import loginPath from './endPoints/LoginPath';
import registerPath from './endPoints/RegisterPath';

// movie routes
import moviesPath from './endPoints/MoviesPath';
import tmdbMoviePath from './endPoints/tmdbMoviesPath';

// like routes
import likePath from './endPoints/LikePath';

// family routes
import familyPath from './endPoints/FamilyPath';

// setting up the router
const router = express.Router();

// asingning the paths to the router
router.use(testPath);
router.use(loginPath);
router.use(registerPath);
router.use(moviesPath);
router.use(tmdbMoviePath);
router.use(likePath);
router.use(familyPath);

export default router;