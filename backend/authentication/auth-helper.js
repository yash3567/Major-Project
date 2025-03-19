import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const salt = 8;
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error(error);
    }
};

export const checkHashedPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
    }
};
