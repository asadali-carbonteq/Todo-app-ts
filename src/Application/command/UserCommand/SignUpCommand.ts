const { Command } = require("simple-command-bus");

export class SignUpCommand extends Command {
    constructor(name: string, email: string, password: string) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}