import { Request, Response } from "express";
import TodoService from "../../Application/TodoService";
import ITodoService from "../../Application/ITodoService";

export default class TodoController {
    private myTodoService: ITodoService;

    constructor() {
        this.myTodoService = new TodoService();
    }

    async getTodo(req: Request, res: Response) {
        try {
            const getTodo = await this.myTodoService.getTodo(req, res);
            console.log("Get Todo Successfull");
            res.status(200).json({ message: "Successfull" })
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async addTodo(req: Request, res: Response) {
        try {
            const createdTodo = await this.myTodoService.addTodo(req, res);
            console.log("New Todo Created:");
            res.status(200).json({ message: "New Todo Created." })
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: error });
        }
    }

    async updateTodo(req: Request, res: Response) {
        try {
            const updatedTodo = await this.myTodoService.updateTodo(req, res);
            console.log("Updated successfully!!")
            res.status(200).json({ message: "Todo Updated Successfully!!!" })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error })
        }
    }

    async deleteTodo(req: Request, res: Response) {
        try {
            const deletedTodo = await this.myTodoService.deleteTodo(req, res);
            console.log("Todo Deleted successfully!!")
            res.status(200).json({ message: "Todo Deleted Successfully." })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
}
