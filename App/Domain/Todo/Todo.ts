import { z } from 'zod';
import { ValidationException } from '../../Infrastructure/Error/validationError';
import { TodoCreationException } from '../../Infrastructure/Error/DomainError';

const TodoSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
    body: z.string(),
    authorId: z.string().uuid({ message: "Invalid UUID" })
})

export class Todo {
    private id: string;
    private body: string;
    private authorId: string;

    constructor(id: string, body: string, authorId: string) {
        this.id = id;
        this.body = body;
        this.authorId = authorId;
    }

    setId(id: string): void { this.id = id; };
    setBody(body: string): void { this.body = body; };
    setAuthorId(authorId: string): void { this.authorId = authorId; };

    getId(): string { return this.id };
    getBody(): string { return this.body };
    getAuthorId(): string { return this.authorId };
}


export function TodoFactoryMethod(id: string, body: string, authorId: string) {
    const ValidationResult = TodoSchema.safeParse({ id, body, authorId });
    if (!ValidationResult.success) {
        throw new ValidationException(ValidationResult.error.message);
    }

    try {
        const todo = new Todo(id, body, authorId);
        return todo;
    } catch (error: any) {
        return new TodoCreationException(error.message);
    }


}
