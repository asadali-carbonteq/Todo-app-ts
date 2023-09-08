import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import secret from "../../Infrastructure/Config/secretKey";
import { InvalidTokenException, NoTokenException, TokenVerficationException } from "../../Infrastructure/Error/AuthError";


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret.SECRET_KEY) as { id: string };

            if (!decoded) {
                throw new InvalidTokenException("Invalid Token");
            }
            req.body = { ...req.body, userId: decoded.id || null }

            next();
        }
        else {
            throw new NoTokenException("No Token");
        }
    }
    catch (error) {
        throw new TokenVerficationException(error as string);
    }
}


export default auth;

