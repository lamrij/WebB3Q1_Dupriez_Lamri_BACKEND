import express from 'express';
import { familyController } from '../../4.controllers/FamilyController';
import { tokenController } from '../../4.controllers/TokenController';
import { validateAndSanitize } from '../../utilities/sanitizer/sanitizer';
import { validationRules } from '../../utilities/sanitizer/rules';

const familyPath = express.Router();

// Route pour créer une nouvelle famille
familyPath.post(
    '/families',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation et nettoyage du nom de la famille
    (req, res) => {
        familyController.createFamily(req, res);
    }
);

// Route pour récupérer une famille par ID
familyPath.post(
    '/families/get-by-id',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation de l'ID
    (req, res) => {
        familyController.getFamilyById(req, res);
    }
);

// Route pour obtenir toutes les familles
familyPath.get(
    '/families/all',
    tokenController.authenticateToken, // Vérification du token
    (req, res) => {
        familyController.getAllFamilies(req, res);
    }
);

// Route pour supprimer une famille par ID
familyPath.post(
    '/families/delete',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation de l'ID
    (req, res) => {
        familyController.deleteFamilyById(req, res);
    }
);

// Route pour associer un utilisateur à une famille
familyPath.post(
    '/families/set-user-family',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation des IDs utilisateur et famille
    (req, res) => {
        familyController.setUserFamily(req, res);
    }
);

// Route pour récupérer tous les utilisateurs d'une famille
familyPath.post(
    '/families/get-users',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation de l'ID de la famille
    (req, res) => {
        familyController.getUsersInFamily(req, res);
    }
);

// Route pour ajouter un provider à une famille
familyPath.post(
    '/families/add-provider',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation de l'ID de la famille et du provider
    (req, res) => {
        familyController.addProviderToFamily(req, res);
    }
);

// Route pour supprimer un provider d'une famille
familyPath.post(
    '/families/remove-provider',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation de l'ID de la famille et du provider
    (req, res) => {
        familyController.removeProviderFromFamily(req, res);
    }
);

// Route pour mettre à jour le booléen likeToRewatch
familyPath.post(
    '/families/update-like-to-rewatch',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateFamily()), // Validation de l'ID de la famille et de likeToRewatch
    (req, res) => {
        familyController.updateLikeToRewatch(req, res);
        console.log('familyPath');
    }
);

export default familyPath;
