import 'reflect-metadata'
import { Request, Response } from "express";
import { TodoService } from "../../Application/Service/TodoService";
import { inject, injectable } from 'inversify';
import { InvalidPageOrSizeException } from '../../Infrastructure/Error/TodoServiceError';
import { GetTodoCommand } from '../../Application/command/TodoCommand/GetTodoCommand';
import { AddTodoCommand } from '../../Application/command/TodoCommand/AddTodoCommand';
import { UpdateTodoCommand } from '../../Application/command/TodoCommand/UpdateTodoCommand';
import { DeleteTodoCommand } from '../../Application/command/TodoCommand/DeleteTodoCommand';
const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddleware = require("../../Infrastructure/commandHandlerMiddleware")


const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    commandHandlerMiddleware
]);


@injectable()
export default class TodoController {
    private myTodoService: TodoService;

    constructor(
        @inject(TodoService) todoService: TodoService
    ) {
        this.myTodoService = todoService;
    }

    async getTodo(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const pages = parseInt(req.query.pages as string);
            const size = parseInt(req.query.size as string);

            //Validation
            if (isNaN(pages) || isNaN(size) || pages < 1 || size < 1) {
                throw new InvalidPageOrSizeException("Invalid Pagination Values");
            }

            const getTodoCommand = new GetTodoCommand(userId, pages, size);
            const todo = await commandBus.handle(getTodoCommand);

            res.status(200).json({ message: "Get Todos Successfull.", todo })
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error, message: "There was some error retrieving the Todos." });
        }
    }

    async addTodo(req: Request, res: Response) {
        try {
            const data = req.body;
            const myAddTodoCommand = new AddTodoCommand(data.body, data.userId);
            const todo = await commandBus.handle(myAddTodoCommand);

            console.log("New Todo Created:");
            res.status(201).json({ message: "New Todo Created", todo })
        } catch (error) {
            console.log(error);
            res.status(400).json({ error, message: "There was some error while Creating a Todo." });
        }
    }


    async updateTodo(req: Request, res: Response) {
        try {
            const body = req.body.body;
            const myUpdateTodoCommand = new UpdateTodoCommand(req.params.id, body);
            const todo = await commandBus.handle(myUpdateTodoCommand);
            console.log("Updated successfully!!")
            res.status(202).json({ message: "Todo Updated Successfully", todo })
        } catch (error) {
            console.log(error);
            res.status(501).json({ error, message: "There was some error while Updating the Todo." })
        }
    }

    async deleteTodo(req: Request, res: Response) {
        try {
            const todoId = req.params.id;
            const myDeleteTodoCommand = new DeleteTodoCommand(todoId);
            const todo = await commandBus.handle(myDeleteTodoCommand);

            console.log("Todo Deleted successfully!!")
            res.status(201).json({ message: "Todo Deleted Successfully.", todo })
        }
        catch (error) {
            console.log(error);
            res.status(501).json({ error, message: "There was some error while deleting Todo" });
        }
    }
}




