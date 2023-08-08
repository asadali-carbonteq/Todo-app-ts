import { Request, Response } from "express";
import TodoService from "../../Application/Service/TodoService";
import ITodoService from "../../Application/Interface/ITodoService";
import { InvalidPageOrSizeException } from "../../Application/Error/TodoServiceError";

export default class TodoController {
    private myTodoService: ITodoService;

    constructor() {
        this.myTodoService = new TodoService();
    }

    async getTodo(req: Request, res: Response) {
        try {
            const getTodo = await this.myTodoService.getTodo(req, res);
            console.log("Get Todo Successfull");
            res.status(200).json({ message: "Get Todos Successfull.", getTodo })
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error, message: "There was some error retrieving the Todos." });
        }
    }

    async addTodo(req: Request, res: Response) {
        try {
            const createdTodo = await this.myTodoService.addTodo(req, res);
            console.log("New Todo Created:");
            res.status(201).json({ message: "New Todo Created", createdTodo })
        } catch (error) {
            console.log(error);
            res.status(400).json({ error, message: "There was some error while Creating a Todo." });
        }
    }

    async updateTodo(req: Request, res: Response) {
        try {
            const updatedTodo = await this.myTodoService.updateTodo(req, res);
            console.log("Updated successfully!!")
            res.status(202).json({ message: "Todo Updated Successfully", updatedTodo })
        } catch (error) {
            console.log(error);
            res.status(501).json({ error, message: "There was some error while Updating the Todo." })
        }
    }

    async deleteTodo(req: Request, res: Response) {
        try {
            const deletedTodo = await this.myTodoService.deleteTodo(req, res);
            console.log("Todo Deleted successfully!!")
            res.status(201).json({ message: "Todo Deleted Successfully.", deletedTodo })
        }
        catch (error) {
            console.log(error);
            res.status(501).json({ error, message: "There was some error while deleting Todo" });
        }
    }
}




