import { TodoService } from "../../../Application/Service/TodoService";
import DIContainer from "../../../Presentation/di-container";
import { DeleteTodoCommand } from "../../../Application/command/TodoCommand/DeleteTodoCommand";


export class DeleteTodoHandler {
    async handle(command: DeleteTodoCommand) {
        const todoService = DIContainer.get<TodoService>(TodoService);
        const todo = await todoService.deleteTodo(command);
        return todo;
    }
}

