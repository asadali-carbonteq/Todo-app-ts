const { Command } = require("simple-command-bus");
import { z } from 'zod';
import { ValidationException } from '../../../Infrastructure/Error/validationError';


const todoCommandSchema = z.object({
    body: z.string(),
    authorId: z.string().uuid({ message: "Invalid UUID" }),
});


export class AddTodoCommand extends Command {
    constructor(body: string, authorId: string) {
        super();

        const ValidationResult = todoCommandSchema.safeParse({ body, authorId });

        if (!ValidationResult.success) {
            throw new ValidationException(ValidationResult.error.message);
        }

        this.body = body;
        this.authorId = authorId;
    }
}
