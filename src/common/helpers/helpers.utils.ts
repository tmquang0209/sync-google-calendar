import * as bcrypt from "bcrypt";

export const HelperService = {
    hashString(str: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(str, saltRounds);
    },

    verifyHash(plainText: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    },
};
