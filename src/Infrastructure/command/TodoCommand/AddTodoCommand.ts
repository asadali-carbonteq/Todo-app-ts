const { Command } = require("simple-command-bus")

import { z } from 'zod'


const todoCommandSchema = z.object({
    body: z.string(),
    authorId: z.string(),
});


export class AddTodoCommand extends Command {
    constructor(body: string, authorId: string) {
        super();

        const ValidationResult = todoCommandSchema.safeParse({ body, authorId });

        if (!ValidationResult.success) {
            throw new Error("Validation failed: " + ValidationResult.error.message);
        }

        this.body = body;
        this.authorId = authorId;
    }
}
