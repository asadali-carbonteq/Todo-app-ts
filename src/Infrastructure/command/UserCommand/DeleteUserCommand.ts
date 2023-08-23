const { Command } = require("simple-command-bus");
import { z } from 'zod';


const DeleteUserCommandSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
})

export class DeleteUserCommand extends Command {
    constructor(id: string) {
        super();

        const ValidationResult = DeleteUserCommandSchema.safeParse({ id });

        if (!ValidationResult.success) {
            throw new Error("Validation Failed: " + ValidationResult.error.message);
        }

        this.id = id;
    }
}