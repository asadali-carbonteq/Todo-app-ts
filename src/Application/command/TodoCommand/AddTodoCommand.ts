import { authorize } from "passport";

const { Command } = require("simple-command-bus")


export class AddTodoCommand extends Command {
    constructor(body: string, authorId: string) {
        super();
        this.body = body;
        this.authorId = authorId;
    }
}
