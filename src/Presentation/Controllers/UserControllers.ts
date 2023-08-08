import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
const { v4: uuidv4 } = require('uuid');
import IUserService from "../../Application/Interface/IUserService";
import UserService from "../../Application/Service/UserService"


export default class UserController {
    private prisma: PrismaClient;
    private myUserService: IUserService;

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
                console.log("successful Sign in");
                res.status(200).json({ message: "Signin Successful" });
            } else {
                console.log("Wrong Credentials, Sign in Failed!!!");
                res.status(401).json({ message: "Enter the correct Username and Password" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error })
        }
    }

    async SignUp(req: Request, res: Response) {
        try {
            const createdUser = await this.myUserService.createUser(req, res);
            console.log("New User Created.");
            res.status(201).json({ message: "Signup Successful, new User created.", createdUser });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error, message: "There was some error while Signup." })
        }
    }

    async Delete(req: Request, res: Response) {
        try {
            const deletedUser = await this.myUserService.deleteUser(req, res);
            console.log("User Deleted.");
            res.status(202).json({ message: "User Deleted", deletedUser });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error, message: "There was some error deleting the user." });
        }
    }

    async Update(req: Request, res: Response) {
        try {
            const updatedUser = await this.myUserService.updateUser(req, res);
            console.log("User Updated successful");
            res.status(200).json({ message: "User Deleted", updatedUser });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error, message: "There was some error updating the User." });
        }
    }

}