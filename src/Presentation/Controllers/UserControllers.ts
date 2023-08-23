import 'reflect-metadata'
import { Request, Response } from "express";
import { injectable } from "inversify";
import { SignInCommand } from "../../Infrastructure/command/UserCommand/SignInCommand";
import { SignUpCommand } from '../../Infrastructure/command/UserCommand/SignUpCommand';
import { DeleteUserCommand } from '../../Infrastructure/command/UserCommand/DeleteUserCommand';
import { UpdateUserCommand } from '../../Infrastructure/command/UserCommand/UpdateUserCommand';
const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
import commandHandlerMiddleware from '../../Infrastructure/commandHandlerMiddleware';



const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    commandHandlerMiddleware
]);


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

            //201
            res.status(user.statusCode).json({ user: user.user, token: user.token, message: user.message });
        }
        catch (error) {
            res.status(500).json({ error, message: "There was some error while Signup." })
        }
    }



    async Delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const myDeleteUserCommand = new DeleteUserCommand(id);
            const user = await commandBus.handle(myDeleteUserCommand);


            res.status(user.statusCode).json({ user: user.user, message: user.message });
        }
        catch (error) {
            res.status(500).json({ error: error, message: "There was some error deleting the user." });
        }
    }



    async Update(req: Request, res: Response) {
        try {
            const data = req.body;
            const myUpdateUserCommand = new UpdateUserCommand(req.params.id, data.name, data.email, data.password);
            const user = await commandBus.handle(myUpdateUserCommand);

            res.status(user.statusCode).json({ user: user.user, message: user.message });
        }
        catch (error) {
            res.status(500).json({ error: error, message: "There was some error updating the User." });
        }
    }

}