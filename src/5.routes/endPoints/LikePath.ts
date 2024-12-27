// 6. routes/likeRoutes.ts
import express from 'express';
import { likeController } from '../../4.controllers/LikeController';
import { tokenController } from '../../4.controllers/TokenController';
import { validateAndSanitize } from '../../sanitizer/sanitizer';
import { validationRules } from '../../sanitizer/rules';

const likePath = express.Router();

// Route pour créer ou mettre à jour un like/dislike
likePath.post(
    '/likes',
    tokenController.authenticateToken, // Vérification du token
    validateAndSanitize(validationRules.validateLike()), // Validation et nettoyage des données
    (req, res) => {
        likeController.createLike(req, res);
    }
);

// Route pour récupérer un like/dislike par son ID
likePath.post(
    '/likes/get-by-id',
    tokenController.authenticateToken,
    validateAndSanitize(validationRules.validateLike()),
    (req, res) => {
        likeController.getLikeById(req, res);
    }
);

// Route pour récupérer tous les likes/dislikes d'un utilisateur
likePath.post(
    '/likes/user-all',
    tokenController.authenticateToken,
    validateAndSanitize(validationRules.validateLike()),
    (req, res) => {
        likeController.getLikesByUser(req, res);
    }
);

// Route pour récupérer uniquement les likes d'un utilisateur
likePath.post(
    '/likes/user-only-likes',
    tokenController.authenticateToken,
    validateAndSanitize(validationRules.validateLike()),
    (req, res) => {
        likeController.getOnlyLikesByUser(req, res);
    }
);

// Route pour récupérer uniquement les dislikes d'un utilisateur
likePath.post(
    '/likes/user-only-dislikes',
    tokenController.authenticateToken,
    validateAndSanitize(validationRules.validateLike()),
    (req, res) => {
        likeController.getOnlyDislikesByUser(req, res);
    }
);

// Route pour supprimer un like/dislike par son ID
likePath.post(
    '/likes/delete',
    tokenController.authenticateToken,
    validateAndSanitize(validationRules.validateLike()),
    (req, res) => {
        likeController.deleteLikeById(req, res);
    }
);

export default likePath;
