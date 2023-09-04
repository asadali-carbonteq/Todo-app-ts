import 'reflect-metadata'
import { Request, Response } from "express";
import { injectable } from "inversify";
import { SignInCommand } from "../../Application/command/UserCommand/SignInCommand";
import { SignUpCommand } from '../../Application/command/UserCommand/SignUpCommand';
import { DeleteUserCommand } from '../../Application/command/UserCommand/DeleteUserCommand';
import { UpdateUserCommand } from '../../Application/command/UserCommand/UpdateUserCommand';
import commandBus from '../../Application/CommandBus/commandBus';
import Notification from "../../Infrastructure/NotificationService/Notification";
import Email from "../../Infrastructure/NotificationService/Email/Email";
import Slack from "../../Infrastructure/NotificationService/Slack/Slack";




@injectable()
export default class UserController {
    private notification: Notification;
    private emailNotificaiton: Email;
    private slackNotificaiton: Slack;

    constructor() {
        this.notification = new Notification();
        this.emailNotificaiton = new Email();
        this.slackNotificaiton = new Slack();

        this.notification.attachObserver(this.emailNotificaiton);
        this.notification.attachObserver(this.slackNotificaiton);
    }


    async SignIn(req: Request, res: Response) {
        try {
            const data = req.body;
            const mySignInCommand = new SignInCommand(data.email, data.password);
            const user = await commandBus.handle(mySignInCommand);

            // Just Checking if my Code works for Observer pattern ..(+).. I have to think about where to put it?

            this.notification.notifyObserver("User Sign In Successful");
            //

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

            this.notification.notifyObserver("User Sign Up Successful")

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