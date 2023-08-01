import { Request, Response, NextFunction } from "express"
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// when a user adds a todo the auth checks if the user is a valid user or not

const auth = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const data = req.body;
        const user = await prisma.user.findUnique({
            where:{
                user_id: data.authorId,
            }
        })
        if(user){
            console.log("Athorized User")
            next();
        }
        else{
            console.log("Unathorized User");
            res.status(401).json({message: "Unathorized User"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Unathorized User"});
    }
}


export default auth;

/*
req.body
{
    "body": "Todo From uuid user",
    "authorId": "7afd9d41-ac77-44da-af03-0a3fa2a70c35"
}


*/