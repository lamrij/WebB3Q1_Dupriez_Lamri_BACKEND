import bcrypt from 'bcrypt';

class Hasher {
    // Méthode pour hasher un mot de passe
    static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // Méthode pour vérifier un mot de passe
    static async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default Hasher;
