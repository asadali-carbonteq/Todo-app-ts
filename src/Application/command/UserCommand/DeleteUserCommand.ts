const { Command } = require("simple-command-bus");
import { z } from 'zod';
import { ValidationException } from '../../../Infrastructure/Error/validationError';


const DeleteUserCommandSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
})

export class DeleteUserCommand extends Command {
    constructor(id: string) {
        super();

        const ValidationResult = DeleteUserCommandSchema.safeParse({ id });

        if (!ValidationResult.success) {
            throw new ValidationException(ValidationResult.error.message);
        }

        this.id = id;
    }
}