import 'reflect-metadata'
import { Request, Response } from "express";
import { injectable } from "inversify";
import { SignInCommand } from "../../Application/command/User/SignInCommand";
import { SignUpCommand } from '../../Application/command/User/SignUpCommand';
import { DeleteUserCommand } from '../../Application/command/User/DeleteUserCommand';
import { UpdateUserCommand } from '../../Application/command/User/UpdateUserCommand';
import commandBus from '../../Application/CommandBus/commandBus';





@injectable()
export default class UserController {

    constructor() { }


    async SignIn(req: Request, res: Response) {
        try {
            const data = req.body;
            const mySignInCommand = new SignInCommand(data.email, data.password);
            const user = await commandBus.handle(mySignInCommand);

            res.status(user.statusCode).json({ user: user.user, token: user.token, message: user.message });
        }
        catch (error) {
            res.status(500).json({ error: error, message: "There was some error while Signup." })
        }
    }



    async SignUp(req: Request, res: Response) {
        try {
            const data = req.body;
            const mySignUpCommand = new SignUpCommand(data.name, data.email, data.password);
            const user = await commandBus.handle(mySignUpCommand);

            res.status(user.statusCode).json({ user: user.user, token: user.token, message: user.message });
        }
        catch (error) {
            res.status(500).json({ error, message: "There was some error while Signup." })
        }
    }



    async Delete(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const id = req.params.id;

            if (userId === id) {
                const myDeleteUserCommand = new DeleteUserCommand(id);
                const user = await commandBus.handle(myDeleteUserCommand);
                res.status(user.statusCode).json({ user: user.user, message: user.message });
            }
            else {
                res.status(401).json({ message: "Unauthorized User" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error, message: "There was some error deleting the user." });
        }
    }



    async Update(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const id = req.params.id;
            const data = req.body;
            if (userId === id) {
                const myUpdateUserCommand = new UpdateUserCommand(req.params.id, data.name, data.email, data.password);
                const user = await commandBus.handle(myUpdateUserCommand);
                res.status(user.statusCode).json({ user: user.user, message: user.message });
            }
            else {
                res.status(401).json({ message: "Unauthorized User" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error, message: "There was some error updating the User." });
        }
    }

}