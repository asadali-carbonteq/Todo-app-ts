const { Command } = require("simple-command-bus");


export class DeleteUserCommand extends Command {
    constructor(id: string) {
        super();
        this.id = id;
    }
}