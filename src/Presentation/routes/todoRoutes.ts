import express from "express";
import TodoController from "../Controllers/TodoControllers";
import { Request, Response } from "express";
import protect from "../Middleware/protect";
import 'reflect-metadata';
import DIContainer from "../di-container";


const todoRouter = express.Router();

const controller = DIContainer.get<TodoController>(TodoController);
//const controller = new TodoController();

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


todoRouter.get("/todo/data", protect, getAllTodos);
todoRouter.post("/todo/add", protect, AddTodo);
todoRouter.delete("/todo/delete/:id", protect, DeleteTodo);
todoRouter.put("/todo/update/:id", protect, UpdateTodo);

export default todoRouter;