import express from "express";
import { port } from "../Bin/commanderCLI";
import userRouter from "./routes/userRoutes"
import todoRouter from "./routes/todoRoutes";
import googleRouter from "./routes/googleRoutes";
import { seedDatabase } from "../Bin/Faker/seedDB";



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


/*
public and secret key created for docker desktop

pub   rsa3072 2023-08-11 [SC] [expires: 2025-08-10]
      D14E3B12096BC5BFDF1B905F26E8398B03838103
uid                      Asad Ali <asad.ali@carbonteq.com>
sub   rsa3072 2023-08-11 [E] [expires: 2025-08-10]
*/


