const { Command } = require("simple-command-bus");
import { z } from 'zod';
import { ValidationException } from '../../../Infrastructure/Error/validationError';


const SignInCommandSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
})


export class SignInCommand extends Command {
    constructor(email: string, password: string) {
        super();

        const ValidationResult = SignInCommandSchema.safeParse({ email, password });

        if (!ValidationResult.success) {
            throw new ValidationException(ValidationResult.error.message);
        }

        this.email = email;
        this.password = password;
    }
}
