import { Request, Response } from "express";
import UserService from "../../Application/Service/UserService"
import { inject, injectable } from "inversify";

@injectable()
export default class UserController {
    private myUserService: UserService;

    constructor(
        @inject(UserService) userService: UserService
    ) {
        this.myUserService = userService;
    }

    async SignIn(req: Request, res: Response) {
        try {
            const signinUser = await this.myUserService.signIn(req, res);
            res.status(201).json({ signinUser });
        }
        catch (error) {
            res.status(500).json({ error, message: "There was some error while Signup." })
        }
    }

    async SignUp(req: Request, res: Response) {
        try {
            const createdUser = await this.myUserService.createUser(req, res);
            res.status(201).json({ createdUser });
        }
        catch (error) {
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