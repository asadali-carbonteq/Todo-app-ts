import 'reflect-metadata';
import express from "express";
import TodoController from "../Controllers/TodoControllers";
import { Request, Response } from "express";
import auth from "../Middleware/auth";
import DIContainer from "../../Infrastructure/DIContainer";


const todoRouter = express.Router();


const controller = DIContainer.get<TodoController>(TodoController);

const getAllTodos: (req: Request, res: Response) => void = (req, res) => {
    controller.getTodo(req, res);
}

const AddTodo: (req: Request, res: Response) => void = (req, res) => {
    controller.addTodo(req, res);
}

const DeleteTodo: (req: Request, res: Response) => void = (req, res) => {
    controller.deleteTodo(req, res);
}

const UpdateTodo: (req: Request, res: Response) => void = (req, res) => {
    controller.updateTodo(req, res);
}


todoRouter.get("/todo/data", auth, getAllTodos);
todoRouter.post("/todo/add", auth, AddTodo);
todoRouter.delete("/todo/delete/:id", auth, DeleteTodo);
todoRouter.put("/todo/update/:id", auth, UpdateTodo);

export default todoRouter;