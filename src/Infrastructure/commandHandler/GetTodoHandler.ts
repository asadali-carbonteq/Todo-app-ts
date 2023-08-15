//import { TodoService } from "../../Application/Service/TodoService";


const TodoService = require("../../Application/Service/TodoService").TodoService;


export interface Command {
    userId: string;
    pages: number;
    size: number;
}


export class GetTodoHandler {
    //constructor(public userId: string, public pages: number, public size: number) { }


    async handle(command: Command) {
        console.log("hello hello in GetTodoHandler");
        const todoService = new TodoService();
        return await todoService.getTodo(command);
    }
}




