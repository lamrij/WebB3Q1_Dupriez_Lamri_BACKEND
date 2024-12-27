import { body } from 'express-validator';

// importer les fonctions de règles 
import { LoginRules } from './rules/loginRule';
import { RegistrationRules } from './rules/registerRule';
import { LikeRules } from './rules/LikesRule';
import { FamilyRules } from './rules/FamilyRule';

class ValidationRules {
    // Récupère la règle de validation pour le login (email et password)
    
    valiteLogin() {
        return LoginRules();
    }

    validateRegistration() {
        return RegistrationRules();
    }

    validateLike() {
        return LikeRules();
    }

    validateFamily() {
        return FamilyRules();
    }
    
}

const validationRules = new ValidationRules();

export { validationRules };
