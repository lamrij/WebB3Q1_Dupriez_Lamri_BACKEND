import express from 'express';
import { viewController } from '../../4.controllers/ViewController';
import { tokenController } from '../../4.controllers/TokenController';
import { validateAndSanitize } from '../../utilities/sanitizer/sanitizer';
import { ViewRules } from '../../utilities/sanitizer/rules/ViewRules';

const viewPath = express.Router();

// Route pour créer une vue
viewPath.post(
    '/views',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(ViewRules()), // Validation et nettoyage des données
    (req, res) => {
        viewController.createView(req, res);
    }
);

// Route pour récupérer une vue par ID
viewPath.post(
    '/views/get-by-id',
    tokenController.authenticateToken,
    validateAndSanitize(ViewRules()),
    (req, res) => {
        viewController.getViewById(req, res);
    }
);

// Route pour récupérer toutes les vues d'un utilisateur
viewPath.post(
    '/views/user-all',
    tokenController.authenticateToken,
    validateAndSanitize(ViewRules()),
    (req, res) => {
        viewController.getViewsByUser(req, res);
    }
);

// Route pour récupérer toutes les vues d'un film
viewPath.post(
    '/views/movie-all',
    tokenController.authenticateToken,
    validateAndSanitize(ViewRules()),
    (req, res) => {
        viewController.getViewsByMovie(req, res);
    }
);

// Route pour supprimer une vue par ID
viewPath.post(
    '/views/delete',
    tokenController.authenticateToken,
    validateAndSanitize(ViewRules()),
    (req, res) => {
        viewController.deleteViewById(req, res);
    }
);

// Route pour supprimer toutes les vues d'un utilisateur
viewPath.post(
    '/views/delete-by-user',
    tokenController.authenticateToken,
    validateAndSanitize(ViewRules()),
    (req, res) => {
        viewController.deleteViewsByUser(req, res);
    }
);

// Route pour supprimer toutes les vues d'un film
viewPath.post(
    '/views/delete-by-movie',
    tokenController.authenticateToken,
    validateAndSanitize(ViewRules()),
    (req, res) => {
        viewController.deleteViewsByMovie(req, res);
    }
);

export default viewPath;
