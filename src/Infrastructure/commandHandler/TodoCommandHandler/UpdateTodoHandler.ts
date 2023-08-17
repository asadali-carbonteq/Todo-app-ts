import { TodoService } from "../../../Application/Service/TodoService";
import DIContainer from "../../../Presentation/di-container";
import { UpdateTodoCommand } from "../../../Application/command/TodoCommand/UpdateTodoCommand";

export class UpdateTodoHandler {
    async handle(command: UpdateTodoCommand) {
        const todoService = DIContainer.get<TodoService>(TodoService);
        const todo = await todoService.updateTodo(command);
        return todo;
    }
}





