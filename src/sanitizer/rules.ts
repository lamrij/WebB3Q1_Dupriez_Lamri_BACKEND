import { body } from 'express-validator';

// importer les fonctions de règles 
import { LoginRules } from './rules/loginRule';
import { RegistrationRules } from './rules/registerRule';
import { LikeRules } from './rules/LikesRules';

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
    
}

const validationRules = new ValidationRules();

export { validationRules };
