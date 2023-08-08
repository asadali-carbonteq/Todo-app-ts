import express from "express";
import userRouter from "./routes/userRoutes"
import todoRouter from "./routes/todoRoutes";
import passport from './passport';
import session from 'express-session';
import { Request, Response, NextFunction } from "express";
import { port } from "./commanderCLI";
import { seedDatabase } from "./Faker/seedDB";
import googleRouter from "./routes/googleRoutes";
//const cookieSession = require('cookie-session');



const app = express();

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//seedDatabase();

app.use(userRouter);
app.use(todoRouter);
app.use(googleRouter);

export default app;



