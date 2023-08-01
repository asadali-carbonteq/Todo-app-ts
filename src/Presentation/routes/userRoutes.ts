import express from 'express';

const userRouter = express.Router();

userRouter.get("/user");
userRouter.post("/user/add");
userRouter.delete("/user/delete/:id");

export default userRouter;