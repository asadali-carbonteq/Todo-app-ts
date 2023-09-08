const { Command } = require("simple-command-bus");
import { z } from 'zod';
import { ValidationException } from '../../../Infrastructure/Error/validationError';

const DeleteTodoCommandSchema = z.object({
    todoId: z.string().uuid({ message: "Invalid UUID" })
})

export class DeleteTodoCommand extends Command {
    constructor(todoId: string) {
        super();

        const ValidationResult = DeleteTodoCommandSchema.safeParse({ todoId });

        if (!ValidationResult.success) {
            throw new ValidationException(ValidationResult.error.message);
        }

        this.todoId = todoId;
    }
}