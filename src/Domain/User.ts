import { Todo } from "./Todo";
import { Email } from "./ValueObject/Email";

export class User {
    private id: string;
    private name: string;
    private email: Email;
    private password: string;
    private todo: Todo[];

    constructor(id: string, name: string, email: string, password: string, todo: Todo[]) {
        this.id = id;
        this.name = name;
        this.email = new Email();
        this.email.setEmail(email);
        this.password = password;
        if (todo) {
            this.todo = todo;
        }
        else {
            this.todo = []
        }
    }

    setId(id: string): void { this.id = id; };
    setName(name: string): void { this.name = name; };
    setEmail(xemail: string): void { this.email.setEmail(xemail); };
    setPassword(password: string): void { this.password = password; };
    setTodo(todo: Todo[]): void { this.todo = todo; };

    getId(): string { return this.id; };
    getName(): string { return this.name; };
    getEmail(): string { return this.email.getEmail(); };
    getPassword(): string { return this.password; };
    getTodo(): Todo[] { return this.todo; };
}