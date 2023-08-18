import 'reflect-metadata'
import { Request, Response } from "express";
import { UserService } from "../../Application/Service/UserService"
import { inject, injectable } from "inversify";
import { SignInCommand } from "../../Application/command/UserCommand/SignInCommand";
import { SignUpCommand } from '../../Application/command/UserCommand/SignUpCommand';
import { DeleteUserCommand } from '../../Application/command/UserCommand/DeleteUserCommand';
import { UpdateUserCommand } from '../../Application/command/UserCommand/UpdateUserCommand';
const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddleware = require("../../Infrastructure/commandHandlerMiddleware")

const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    commandHandlerMiddleware
]);


@injectable()
export default class UserController {
    private myUserService: UserService;

    constructor(
        @inject(UserService) userService: UserService,
    ) {
        this.myUserService = userService;
    }



    async SignIn(req: Request, res: Response) {
        try {
            const data = req.body;
            const mySignInCommand = new SignInCommand(data.email, data.password);
            console.log(mySignInCommand);
            const user = await commandBus.handle(mySignInCommand);

            res.status(201).json({ user });
        }
        catch (error) {
            res.status(500).json({ error, message: "There was some error while Signup." })
        }
    }



    async SignUp(req: Request, res: Response) {
        try {
            const data = req.body;
            const mySignUpCommand = new SignUpCommand(data.name, data.email, data.password);
            const user = await commandBus.handle(mySignUpCommand);

            res.status(201).json({ user });
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


            res.status(202).json({ message: "User Deleted", user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error, message: "There was some error deleting the user." });
        }
    }



    async Update(req: Request, res: Response) {
        try {
            const data = req.body;
            const myUpdateUserCommand = new UpdateUserCommand(req.params.id, data.name, data.email, data.password);
            const user = await commandBus.handle(myUpdateUserCommand);

            res.status(200).json({ message: "User Deleted", user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error, message: "There was some error updating the User." });
        }
    }

}