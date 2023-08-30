import 'reflect-metadata'
import { Request, Response } from "express";
import { injectable } from 'inversify';
import { InvalidPageOrSizeException } from '../../Infrastructure/Error/TodoServiceError';
import GetTodoCommand from '../../Application/command/TodoCommand/GetTodoCommand';
import { AddTodoCommand } from '../../Application/command/TodoCommand/AddTodoCommand';
import { UpdateTodoCommand } from '../../Application/command/TodoCommand/UpdateTodoCommand';
import { DeleteTodoCommand } from '../../Application/command/TodoCommand/DeleteTodoCommand';
import commandBus from '../../Application/CommandBus/commandBus';
// const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
// import commandHandlerMiddleware from '../../Application/commandHandlerMiddleware';


// console.log(commandHandlerMiddleware);

// const commandBus = new CommandBus([
//     new LoggerMiddleware(console),
//     commandHandlerMiddleware
// ]);


@injectable()
export default class TodoController {

    constructor() { }


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

            res.status(todo.statusCode).json({ todo: todo.todo, message: todo.message });
        }
        catch (error) {
            res.status(400).json({ error: error, message: "There was some error retrieving the Todos." });
        }
    }

    async addTodo(req: Request, res: Response) {
        try {
            const data = req.body;
            const myAddTodoCommand = new AddTodoCommand(data.body, data.userId);
            const todo = await commandBus.handle(myAddTodoCommand);

            res.status(todo.statusCode).json({ todo: todo.todo, message: todo.message });
        } catch (error) {
            res.status(400).json({ error: error, message: "There was some error while Creating a Todo." });
        }
    }


    async updateTodo(req: Request, res: Response) {
        try {
            const body = req.body.body;
            const myUpdateTodoCommand = new UpdateTodoCommand(req.params.id, body);
            const todo = await commandBus.handle(myUpdateTodoCommand);
            res.status(todo.statusCode).json({ todo: todo.todo, message: todo.message });
        } catch (error) {
            res.status(501).json({ error: error, message: "There was some error while Updating the Todo." })
        }
    }

    async deleteTodo(req: Request, res: Response) {
        try {
            const todoId = req.params.id;
            const myDeleteTodoCommand = new DeleteTodoCommand(todoId);
            const todo = await commandBus.handle(myDeleteTodoCommand);

            res.status(todo.statusCode).json({ todo: todo.todo, message: todo.message });
        }
        catch (error) {
            res.status(501).json({ error, message: "There was some error while deleting Todo" });
        }
    }
}




