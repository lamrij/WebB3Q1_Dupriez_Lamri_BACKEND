import { body } from "express-validator";

export function LikeRules() {
    return [
        // Validation de l'ID de l'utilisateur (doit être un entier positif)
        body("user_id")
            .isInt({ min: 1 })
            .withMessage("User ID must be a positive integer."),

        // Validation de l'ID du film (doit être un entier positif)
        body("movie_id")
            .isInt({ min: 1 })
            .withMessage("Movie ID must be a positive integer."),

        // Validation de l'état du like (doit être un booléen)
        body("is_like")
            .isBoolean()
            .withMessage("is_like must be a boolean value."),

        // Validation de l'ID du like (pour les routes de récupération et de suppression)
        body("id")
            .optional() // Cette validation est optionnelle, car elle ne s'applique que sur certaines routes
            .isInt({ min: 1 })
            .withMessage("Like ID must be a positive integer."),

        // Validation de l'ID de l'utilisateur pour la récupération des likes/dislikes
        body("user_id")
            .optional() // Cette validation est optionnelle pour les routes de récupération
            .isInt({ min: 1 })
            .withMessage("User ID must be a positive integer."),
    ];
}
