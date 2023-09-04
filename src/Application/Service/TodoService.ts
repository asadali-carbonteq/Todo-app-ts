import TodoRepository from "../../Infrastructure/Repository/TodoRepository";
const { v4: uuidv4 } = require('uuid');
import { TodoNotFoundException, InvalidPageOrSizeException, TodoNotCreatedException, TodoNotUpdatedException, TodoNotDeletedException } from "../../Infrastructure/Error/TodoServiceError";
import { inject, injectable } from "inversify";
import GetTodoCommand from "../command/TodoCommand/GetTodoCommand";
import { AddTodoCommand } from "../command/TodoCommand/AddTodoCommand";
import { UpdateTodoCommand } from "../command/TodoCommand/UpdateTodoCommand";
import { DeleteTodoCommand } from "../command/TodoCommand/DeleteTodoCommand";


@injectable()
export class TodoService {
    private todoRepository: TodoRepository;


    constructor(
        @inject(TodoRepository) todoRepo: TodoRepository
    ) {
        this.todoRepository = todoRepo;
    };


    async getTodo(command: GetTodoCommand) {
        try {
            const userId = command.userId;
            const pages = command.pages;
            const size = command.size;

            if (isNaN(pages) || isNaN(size) || pages < 1 || size < 1) {
                throw new InvalidPageOrSizeException("Invalid Pagination Values");
            }

            const todos = await this.todoRepository.GetTodo(userId, pages, size);
            return todos;
        }
        catch (error) {
            throw new TodoNotFoundException("Todo Not Found");
        }
    }


    async addTodo(command: AddTodoCommand) {
        try {
            const body = command.body;
            const authorId = command.authorId;

            const generatedUUID = uuidv4();

            const createdTodo = await this.todoRepository.CreateTodo(generatedUUID, body, authorId);

            return createdTodo;
        }
        catch (error) {
            throw new TodoNotCreatedException("Todo Not Created");
        }
    }


    async updateTodo(command: UpdateTodoCommand) {
        try {
            const todoId = command.todoId;
            const body = command.body;

            const updatedTodo = await this.todoRepository.UpdateTodo(todoId, body);//req.params.id, data.body)

            return updatedTodo;
        }
        catch (error) {
            throw new TodoNotUpdatedException("Todo Not Updated");
        }
    }


    async deleteTodo(command: DeleteTodoCommand) {
        try {
            const todoId = command.todoId;
            const deletedTodo = await this.todoRepository.DeleteTodo(todoId);
            return deletedTodo;
        }
        catch (error) {
            throw new TodoNotDeletedException("Todo Not Deleted");
        }
    }
}
