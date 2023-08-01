import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
const { v4: uuidv4 } = require('uuid');

import UserService from "../../Application/UserService"


export default class UserController {
    private prisma: PrismaClient;
    private myUserService: UserService;

    constructor() {
        this.prisma = new PrismaClient();
        this.myUserService = new UserService();
    }

    async SignIn(req: Request, res: Response) {
        const data = req.body;
        console.log(data);
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            })
            if (user && user.password === data.password) {
                console.log("successful Sign in, new user created");
            } else {
                console.log("Wrong Credentials, Sign in Failed!!!");
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: error
            })
        }
    }

    async SignUp(req: Request, res: Response) {
        try {
            const createdUser = await this.myUserService.createUser(req, res);
            console.log("New User Created.");
            console.log(createdUser);
            res.status(200).json({ message: "New User Created." });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error })
        }
    }

    async Delete(req: Request, res: Response) {
        try {
            const deletedUser = await this.myUserService.deleteUser(req, res);
            console.log("User Deleted.");
            console.log(deletedUser);
            res.status(200).json({ message: "User Deleted", deletedUser });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async Update(req: Request, res: Response) {
        try {
            const updatedUser = await this.myUserService.updateUser(req, res);
            console.log("User Updated.");
            console.log(updatedUser);
            res.status(200).json({ message: "User Deleted", updatedUser });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

}