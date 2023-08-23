const { Command } = require("simple-command-bus");
import { z } from 'zod'


const SignUpCommandSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
});


export class SignUpCommand extends Command {
    constructor(name: string, email: string, password: string) {
        super();

        const ValidationResult = SignUpCommandSchema.safeParse({ name, email, password });

        if (!ValidationResult.success) {
            throw new Error("Validation Failed: " + ValidationResult.error.message);
        }

        this.name = name;
        this.email = email;
        this.password = password;
    }
}