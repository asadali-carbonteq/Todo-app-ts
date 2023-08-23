const { Command } = require("simple-command-bus");
import { z } from 'zod';


const UpdateUserCommandSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
})


export class UpdateUserCommand extends Command {
    constructor(id: string, name: string, email: string, password: string) {
        super();

        const ValidationResult = UpdateUserCommandSchema.safeParse({ id, name, email, password });

        if (!ValidationResult.success) {
            throw new Error("Validation Error: " + ValidationResult.error.message);
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}