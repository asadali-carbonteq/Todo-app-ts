const { Command } = require("simple-command-bus");

export class GetTodoCommand extends Command {
    constructor(userId: string, pages: number, size: number) {
        super();
        this.userId = userId;
        this.pages = pages;
        this.size = size;
    }
}