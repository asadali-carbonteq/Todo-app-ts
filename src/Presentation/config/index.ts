import express from "express";
import userRouter from "../routes/userRoutes"
import todoRouter from "../routes/todoRoutes";

const app = express();
const port = 8080

app.use(express.json());



app.listen(port, ()=>{
    console.log("Server is running on port 8080")
});

app.use(userRouter);
app.use(todoRouter);

