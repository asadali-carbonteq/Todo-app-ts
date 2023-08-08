import TodoRepository from "../../Infrastructure/Repository/TodoRepository";
import { ModelFactory, Todo } from "../../Domain/FactoryMethod";
import { Request, Response } from "express";
import ITodoService from "../Interface/ITodoService";
const { v4: uuidv4 } = require('uuid');
import ITodoRepository from "../../Infrastructure/Interface/ITodoRepository";
import { TodoNotFoundException, InvalidPageOrSizeException, TodoNotCreatedException, TodoNotUpdatedException, TodoNotDeletedException } from "../Error/TodoServiceError";



export default class TodoService implements ITodoService {
    private todoRepository: ITodoRepository;


    constructor() {
        this.todoRepository = new TodoRepository();
    }


    async getTodo(req: Request, res: Response) {
        const pages = parseInt(req.query.pages as string);
        const size = parseInt(req.query.size as string);

        if (isNaN(pages) || isNaN(size) || pages < 1 || size < 1) {
            throw new InvalidPageOrSizeException("Invalid Pagination Values");
        }

        const todos = await this.todoRepository.GetTodo(req.params.id, pages, size);

        if (!todos || todos.length === 0) {
            throw new TodoNotFoundException("Todo Not Found");
        }

        return todos;
    }



    async addTodo(req: Request, res: Response) {
        const data = req.body;
        const generatedUUID = uuidv4();
        const myModelFactory = new ModelFactory();

        const todo = myModelFactory.getModel("todo") as Todo;
        todo.setId(generatedUUID);
        todo.setBody(data.body);
        todo.setAuthorId(data.authorId);

        const createdTodo = await this.todoRepository.CreateTodo(todo);

        if (!createdTodo) {
            throw new TodoNotCreatedException("Todo Not Created");
        }
        return createdTodo;
    }


    async updateTodo(req: Request, res: Response) {
        const data = req.body;
        const updatedTodo = await this.todoRepository.UpdateTodo(data.body, req.params.id)

        if (!updatedTodo) {
            throw new TodoNotUpdatedException("Todo Not Updated");
        }

        return updatedTodo;
    }


    async deleteTodo(req: Request, res: Response) {
        const deletedTodo = await this.todoRepository.DeleteTodo(req.params.id);

        if (!deletedTodo) {
            throw new TodoNotDeletedException("Todo Not Deleted");
        }

        return deletedTodo;
    }
}



