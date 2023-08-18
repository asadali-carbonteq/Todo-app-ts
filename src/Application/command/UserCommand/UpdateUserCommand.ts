const { Command } = require("simple-command-bus");


export class UpdateUserCommand extends Command {
    constructor(id: string, name: string, email: string, password: string) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}