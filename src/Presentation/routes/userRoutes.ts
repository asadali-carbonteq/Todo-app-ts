import 'reflect-metadata'
import express from 'express';
import UserController from '../Controllers/UserControllers';
import { Request, Response } from 'express';
import protect from '../Middleware/protect';
import DIContainer from '../di-container';

const userRouter = express.Router();


const controller = DIContainer.get<UserController>(UserController);
//const controller: UserController = new UserController();

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
userRouter.delete("/user/delete/:id", protect, deleteUser);
userRouter.put("/user/update/:id", protect, updateUser);

export default userRouter;


/*
Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzYWRAdGVzdC5jb20iLCJpZCI6ImE0Y2RhOGQ3LWZjM2MtNDRmMy1hNzE5LTIyNmUzYWU0MDE5ZiIsImlhdCI6MTY5MTY1NDY3Nn0.lz6SygvA-mPx_SwpHQPj7qh2IgVgEszLEMKeDTrOC_k
password:
asad
email:
asad@test.com
*/