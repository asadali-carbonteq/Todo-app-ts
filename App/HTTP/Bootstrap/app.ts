import express from "express";
import userRouter from "../Routes/userRoutes"
import todoRouter from "../Routes/todoRoutes";
import googleRouter from "../Routes/googleRoutes";



const app = express();

app.use(express.json());


app.use(userRouter);
app.use(todoRouter);
app.use(googleRouter);

export default app;
