import { body, param } from "express-validator";

export function FamilyRules() {
    return [
        // Validation du nom de la famille (doit être une chaîne de caractères non vide)
        body("nom")
            .notEmpty()
            .withMessage("Family name is required.")
            .isString()
            .withMessage("Family name must be a string."),
        
        // Validation de l'ID de la famille pour les paramètres de route (doit être un entier positif)
        body("id")
            .optional() // Facultatif pour certaines routes
            .isInt({ min: 1 })
            .withMessage("Family ID must be a positive integer."),

        // Validation de l'ID de l'utilisateur pour l'association à une famille
        body("userId")
            .optional() // Facultatif pour certaines routes
            .isInt({ min: 1 })
            .withMessage("User ID must be a positive integer."),

        // Validation de l'ID de la famille pour l'association à un utilisateur
        body("familyId")
            .optional() // Facultatif pour certaines routes
            .isInt({ min: 1 })
            .withMessage("Family ID must be a positive integer."),
    ];
}
