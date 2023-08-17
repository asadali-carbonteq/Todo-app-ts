const { Command } = require("simple-command-bus");

export class DeleteTodoCommand extends Command {
    constructor(todoId: string) {
        super();
        this.todoId = todoId;
    }
}