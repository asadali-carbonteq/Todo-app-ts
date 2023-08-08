import { Email } from "./ValueObject/Email";

export class ModelFactory {
    getModel(modelType: string): Model | null {
        if (modelType == null) {
            return null;
        }
        else if (modelType == "user") {
            return new User;
        }
        else if (modelType == "todo") {
            return new Todo;
        }
        else {
            return null;
        }
    }
}


interface Model {
    operation(): string;
}


export class User implements Model {
    private id: string;
    private name: string;
    private email: Email;
    private password: string;
    private todo: Todo[];

    constructor() {
        this.id = "";
        this.name = "";
        this.email = new Email();
        this.password = "";
        this.todo = [];
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

    public operation(): string {
        return "this is some operation that is being implemented by Concrete User class.";
    }
}


export class Todo implements Model {
    private id: string;
    private body: string;
    private authorId: string;

    constructor() {
        this.id = "";
        this.body = "";
        this.authorId = "";
    }

    setId(id: string): void { this.id = id; };
    setBody(body: string): void { this.body = body; };
    setAuthorId(authorId: string): void { this.authorId = authorId; };

    getId(): string { return this.id };
    getBody(): string { return this.body };
    getAuthorId(): string { return this.authorId };

    public operation(): string {
        return "this is some operation that is being implemented by concrete Todo class.";
    }
}


//~~~~~~~~ Just to run the code, I am making a Todo Class that is not being initiated by factory method. ``````//

/*

    constructor(id: string, body: string, authorId: string) {
        this.id = id;
        this.body = body;
        this.authorId = authorId;
    }

    constructor(id: string, name: string, email: string, password: string, todo: TodoEntity[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.todo = todo;
    }


*/