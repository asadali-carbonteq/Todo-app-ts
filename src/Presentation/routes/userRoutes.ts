import express from 'express';
import UserController from '../Controllers/UserControllers';
import { Request, Response } from 'express';
import auth from '../Middleware/authMiddleware';

const userRouter = express.Router();

const controller: UserController = new UserController();

const createUser: (req: Request, res: Response) => void = (req, res) => {
    controller.SignUp(req, res);
}

const updateUser: (req: Request, res: Response) => void = (req, res) => {
    controller.Update(req, res);
}

const deleteUser: (req: Request, res: Response) => void = (req, res) => {
    controller.Delete(req, res);
}

const signIn: (req: Request, res: Response) => void = (req, res) => {
    controller.SignIn(req, res);
}

userRouter.post("/user", signIn);
userRouter.post("/user/add", createUser);
userRouter.delete("/user/delete/:id", deleteUser);
userRouter.put("/user/update/:id", updateUser);

export default userRouter;