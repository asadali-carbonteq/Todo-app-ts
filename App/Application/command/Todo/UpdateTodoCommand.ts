const { Command } = require("simple-command-bus");
import { z } from "zod";
import { ValidationException } from "../../../Infrastructure/Error/validationError";


const UpdateTodoCommandSchema = z.object({
    todoId: z.string().uuid({ message: "Invalid UUID" }),
    body: z.string()
})

export class UpdateTodoCommand extends Command {
    constructor(todoId: string, body: string) {
        super();

        const ValidationResult = UpdateTodoCommandSchema.safeParse({ todoId, body });

        if (!ValidationResult.success) {
            throw new ValidationException(ValidationResult.error.message);
        }

        this.todoId = todoId;
        this.body = body;
    }
}