import TodoRepository from "../../Infrastructure/Repository/TodoRepository";
const { v4: uuidv4 } = require('uuid');
import { TodoNotFoundException, InvalidPageOrSizeException, TodoNotCreatedException, TodoNotUpdatedException, TodoNotDeletedException } from "../../Infrastructure/Error/TodoServiceError";
import { inject, injectable } from "inversify";
import GetTodoCommand from "../command/Todo/GetTodoCommand";
import { AddTodoCommand } from "../command/Todo/AddTodoCommand";
import { UpdateTodoCommand } from "../command/Todo/UpdateTodoCommand";
import { DeleteTodoCommand } from "../command/Todo/DeleteTodoCommand";
import NotificationService from "./NotificationService";
import PaginationData from "../../Infrastructure/utils/Pagination/paginationData";


@injectable()
export class TodoService {
    private todoRepository: TodoRepository;
    private notificationService: NotificationService;


    constructor(
        @inject(TodoRepository) todoRepo: TodoRepository,
        @inject(NotificationService) notificationService: NotificationService
    ) {
        this.todoRepository = todoRepo;
        this.notificationService = notificationService
    };


    async getTodo(command: GetTodoCommand) {
        try {
            const userId = command.userId;
            const paginationOptions = command.paginationOption;

            let todoPerPage = paginationOptions.getPageSize();
            let search = paginationOptions.getSearch();
            let totalTodoCount = await this.todoRepository.GetTodoCount(userId);
            let totalPages = Math.ceil(totalTodoCount / todoPerPage);

            let currentPage = paginationOptions.getPage();

            let nextPage;
            if (currentPage < totalPages) {
                nextPage = currentPage + 1;
            } else {
                nextPage = currentPage;
            }

            let previousPage;
            if (currentPage > 1) {
                previousPage = currentPage - 1;
            } else {
                previousPage = currentPage;
            }

            const paginationData = new PaginationData(nextPage, currentPage, previousPage, totalPages, search);
            const todos = await this.todoRepository.GetTodo(userId, paginationOptions, paginationData);
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
