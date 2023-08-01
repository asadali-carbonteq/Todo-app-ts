import TodoRepository from "../Infrastructure/TodoRepository";
import { ModelFactory, Todo } from "../Domain/FactoryMethod";
import { Request, Response } from "express";
import ITodoService from "./ITodoService";
const { v4: uuidv4 } = require('uuid');
import ITodoRepository from "../Infrastructure/ITodoRepository";



export default class TodoService implements ITodoService {
    private todoRepository: ITodoRepository;


    constructor() {
        this.todoRepository = new TodoRepository();
    }


    async getTodo(req: Request, res: Response) {
        const todos = await this.todoRepository.GetTodo(req.params.id);
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
        return createdTodo;
    }


    async updateTodo(req: Request, res: Response) {
        const data = req.body;
        const updatedTodo = await this.todoRepository.UpdateTodo(data.body, req.params.id)
        return updatedTodo;
    }


    async deleteTodo(req: Request, res: Response) {
        const deletedTodo = await this.todoRepository.DeleteTodo(req.params.id);
        return deletedTodo;
    }
}



