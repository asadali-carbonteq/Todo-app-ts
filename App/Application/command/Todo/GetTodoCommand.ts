const { Command } = require("simple-command-bus");
import { z } from 'zod';
import { ValidationException } from '../../../Infrastructure/Error/validationError';
import PaginationOptions from '../../../Infrastructure/utils/Pagination/paginationOption';

const GetTodoCommandSchema = z.object({
    userId: z.string().uuid({ message: "Invalid UUID" }),
    paginationOptions: z.object({
        pages: z.number().min(0),
        pageSize: z.number().min(0),
        search: z.string(),
    })
})


export default class GetTodoCommand extends Command {
    constructor(userId: string, paginationOptions: PaginationOptions) {
        super();

        const ValidationResult = GetTodoCommandSchema.safeParse({ userId, paginationOptions });


        if (!ValidationResult.success) {
            throw new ValidationException(ValidationResult.error.message);
        }

        this.userId = userId;
        this.paginationOption = paginationOptions;
    }
}