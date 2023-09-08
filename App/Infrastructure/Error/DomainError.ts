export class InvalidEmailException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidEmailException";
    }
}

export class UserCreationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserCreationException";
    }
}

export class TodoCreationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TodoCreationException";
    }
}