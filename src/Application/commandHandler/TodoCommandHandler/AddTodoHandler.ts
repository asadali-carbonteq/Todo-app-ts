import { TodoService } from "../../../Application/Service/TodoService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { AddTodoCommand } from "../../../Application/command/TodoCommand/AddTodoCommand";


export class AddTodoHandler {
    async handle(command: AddTodoCommand) {
        const todoService = DIContainer.get<TodoService>(TodoService);
        const todo = await todoService.addTodo(command);
        return todo;
    }
}



