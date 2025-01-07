import { body } from "express-validator";

export function ViewRules() {
    return [
        // Validation de l'ID de l'utilisateur (doit être un entier positif)
        body("userId")
            .isInt({ min: 1 })
            .withMessage("User ID must be a positive integer."),

        // Validation de l'ID du film (doit être un entier positif)
        body("movieId")
            .isInt({ min: 1 })
            .withMessage("Movie ID must be a positive integer."),

        // Validation de l'ID de la vue pour les routes de récupération et suppression
        body("id")
            .optional() // Cette validation est optionnelle, car elle ne s'applique qu'à certaines routes
            .isInt({ min: 1 })
            .withMessage("View ID must be a positive integer."),
    ];
}
