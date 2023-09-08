import { TodoService } from "../../../Application/Service/TodoService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { UpdateTodoCommand } from "../../command/Todo/UpdateTodoCommand";

export class UpdateTodoHandler {
    async handle(command: UpdateTodoCommand) {
        const todoService = DIContainer.get<TodoService>(TodoService);
        const todo = await todoService.updateTodo(command);
        return todo;
    }
}





