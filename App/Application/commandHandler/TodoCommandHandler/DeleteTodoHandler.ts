import { TodoService } from "../../../Application/Service/TodoService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { DeleteTodoCommand } from "../../command/Todo/DeleteTodoCommand";


export class DeleteTodoHandler {
    async handle(command: DeleteTodoCommand) {
        const todoService = DIContainer.get<TodoService>(TodoService);
        const todo = await todoService.deleteTodo(command);
        return todo;
    }
}

