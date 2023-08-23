const { Command } = require("simple-command-bus");



export class UpdateTodoCommand extends Command {
    constructor(todoId: string, body: string) {
        super();
        this.todoId = todoId;
        this.body = body;
    }
}