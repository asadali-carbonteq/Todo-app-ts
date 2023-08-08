export class InvalidPageOrSizeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidPageOrSizeExcption";
        //this.message = "oogie boogie.";
    }
}

export class TodoNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TodoNotFoundException";
    }
}

export class TodoNotCreatedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TodoNotCreatedException";
    }
}

export class TodoNotUpdatedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TodoNotUpdatedException";
    }
}

export class TodoNotDeletedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TodoNotDeletedException";
    }
}