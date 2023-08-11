import TodoRepository from "../../Infrastructure/Repository/TodoRepository";
import { Factory } from "../../Domain/FactoryMethod";
import { Request, Response } from "express";
const { v4: uuidv4 } = require('uuid');
import { TodoNotFoundException, InvalidPageOrSizeException, TodoNotCreatedException, TodoNotUpdatedException, TodoNotDeletedException } from "../../Infrastructure/Error/TodoServiceError";
import { inject, injectable } from "inversify";


@injectable()
export default class TodoService {
    private todoRepository: TodoRepository;


    constructor(
        @inject(TodoRepository) todoRepo: TodoRepository
    ) {
        this.todoRepository = todoRepo;
    }


    async getTodo(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const pages = parseInt(req.query.pages as string);
            const size = parseInt(req.query.size as string);

            if (isNaN(pages) || isNaN(size) || pages < 1 || size < 1) {
                throw new InvalidPageOrSizeException("Invalid Pagination Values");
            }

            const todos = await this.todoRepository.GetTodo(userId, pages, size);

            return todos;
        }
        catch {
            throw new TodoNotFoundException("Todo Not Found");
        }
    }



    async addTodo(req: Request, res: Response) {
        try {
            console.log(req.body);
            const data = req.body;
            const generatedUUID = uuidv4();
            const myFactory = new Factory();
            const todo = myFactory.TodoFactoryMethod(generatedUUID, data.body, data.userId);

            const createdTodo = await this.todoRepository.CreateTodo(todo);

            return createdTodo;
        } catch (error) {
            throw new TodoNotCreatedException("Todo Not Created");
        }
    }


    async updateTodo(req: Request, res: Response) {
        try {
            console.log(req.body);
            const data = req.body;
            console.log(data);

            const updatedTodo = await this.todoRepository.UpdateTodo(req.params.id, data.body)

            return updatedTodo;
        } catch (error) {
            throw new TodoNotUpdatedException("Todo Not Updated");
        }
    }


    async deleteTodo(req: Request, res: Response) {
        try {
            const deletedTodo = await this.todoRepository.DeleteTodo(req.params.id);
            return deletedTodo;
        }
        catch (error) {
            throw new TodoNotDeletedException("Todo Not Deleted");
        }
    }
}



