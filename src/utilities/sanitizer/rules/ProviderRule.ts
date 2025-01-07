import { body } from "express-validator";

export function ProviderRules() {
    return [
        // Validation de l'ID du film (doit être un entier positif)
        body("movieId")
            .isInt({ min: 1 })
            .withMessage("Movie ID must be a positive integer."),

        // Validation du nom du fournisseur (doit être une chaîne non vide)
        body("providerName")
            .isString()
            .notEmpty()
            .withMessage("Provider name must be a non-empty string."),

        // Validation de l'ID du fournisseur pour les routes de récupération et suppression
        body("id")
            .optional() // Validation optionnelle (ne concerne que certaines routes)
            .isInt({ min: 1 })
            .withMessage("Provider ID must be a positive integer."),
    ];
}
