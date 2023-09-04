const { Command } = require("simple-command-bus");
import { z } from 'zod';
import { ValidationException } from '../../../Infrastructure/Error/validationError';
import paginationOptions from '../../../Infrastructure/utils/Pagination/paginationOption';

// const GetTodoCommandSchema = z.object({
//     userId: z.string().uuid({message: "Invalid UUID"}),
//     pages: 
// })

//Needs to be updated to the correct pagination format

export default class GetTodoCommand extends Command {
    constructor(userId: string, pages: number, size: number) {
        super();
        this.userId = userId;
        this.pages = pages;
        this.size = size;
        //add search
    }
}
