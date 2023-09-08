import { TodoService } from "../../../Application/Service/TodoService";
import DIContainer from "../../../Infrastructure/DIContainer";
import GetTodoCommand from "../../command/Todo/GetTodoCommand";



export class GetTodoHandler {
    async handle(command: GetTodoCommand) {
        const todoService = DIContainer.get<TodoService>(TodoService);
        const todo = await todoService.getTodo(command);
        return todo;
    }
}




