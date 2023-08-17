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

/*
Mr.Asad
asad@test.com
asad
30112f9c-898a-4196-b9c4-54962b6a98c9
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzYWRAdGVzdC5jb20iLCJpZCI6IjMwMTEyZjljLTg5OGEtNDE5Ni1iOWM0LTU0OTYyYjZhOThjOSIsImlhdCI6MTY5MjA4NjU0MH0.9W-i_EXoIguw6trn57z3gNn_33EewuSp4z0p2y-si1Q */