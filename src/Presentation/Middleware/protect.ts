import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { error } from "console";
const SECRET_KEY = "Hello_World";


const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

            if (!decoded) {
                throw new Error("Invalid Token")
            }
            req.body = { ...req.body, userId: decoded.id || null }
            next();
        }
        else {
            throw new Error("No token")
        }
    }
    catch (error) {
        throw new Error("Error Verifing User Token");
    }
}


export default protect;