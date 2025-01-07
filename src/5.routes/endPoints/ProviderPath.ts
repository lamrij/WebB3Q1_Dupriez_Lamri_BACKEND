import express from 'express';
import { providerController } from '../../4.controllers/ProviderController';
import { tokenController } from '../../4.controllers/TokenController';
import { validateAndSanitize } from '../../utilities/sanitizer/sanitizer';
import { ProviderRules } from '../../utilities/sanitizer/rules/ProviderRule';

const providerPath = express.Router();

// Route pour créer ou mettre à jour un fournisseur
providerPath.post(
    '/providers',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(ProviderRules()), // Validation et nettoyage des données
    (req, res) => {
        providerController.createProvider(req, res);
    }
);

// Route pour récupérer un fournisseur par son ID
providerPath.post(
    '/providers/get-by-id',
    tokenController.authenticateToken,
    validateAndSanitize(ProviderRules()),
    (req, res) => {
        providerController.getProviderById(req, res);
    }
);

// Route pour récupérer tous les fournisseurs associés à un film
providerPath.post(
    '/providers/movie-all',
    tokenController.authenticateToken,
    validateAndSanitize(ProviderRules()),
    (req, res) => {
        providerController.getProvidersByMovie(req, res);
    }
);

// Route pour supprimer un fournisseur par son ID
providerPath.post(
    '/providers/delete',
    tokenController.authenticateToken,
    validateAndSanitize(ProviderRules()),
    (req, res) => {
        providerController.deleteProviderById(req, res);
    }
);

// Route pour supprimer tous les fournisseurs d'un film
providerPath.post(
    '/providers/delete-by-movie',
    tokenController.authenticateToken,
    validateAndSanitize(ProviderRules()),
    (req, res) => {
        providerController.deleteProvidersByMovie(req, res);
    }
);

export default providerPath;
