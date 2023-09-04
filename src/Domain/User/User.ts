import { ValidationException } from "../../Infrastructure/Error/validationError";
import { Todo } from "../Todo/Todo";
import { Email } from "../ValueObject/Email";
import { z } from 'zod';


const UserSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
    name: z.string(),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string()
})


export class User {
    private id: string;
    private name: string;
    private email: Email;
    private password: string;
    private todo: Todo[];

    constructor(id: string, name: string, email: string, password: string, todo: Todo[] = []) {
        this.id = id;
        this.name = name;
        this.email = new Email();
        this.email.setEmail(email);
        this.password = password;
        this.todo = todo;
    }

    setId(id: string): void { this.id = id; };
    setName(name: string): void { this.name = name; };
    setEmail(email: string): void { this.email.setEmail(email); };
    setPassword(password: string): void { this.password = password; };
    setTodo(todo: Todo[]): void { this.todo = todo; };

    getId(): string { return this.id; };
    getName(): string { return this.name; };
    getEmail(): string { return this.email.getEmail(); };
    getPassword(): string { return this.password; };
    getTodo(): Todo[] { return this.todo; };
}

export function UserFactoryMethod(id: string, name: string, email: string, password: string, todo: Todo[]) {
    //guarding
    const ValidationResult = UserSchema.safeParse({ id, name, email, password });
    if (!ValidationResult.success) {
        throw new ValidationException(ValidationResult.error.message);
    }

    return new User(id, name, email, password, todo);
}