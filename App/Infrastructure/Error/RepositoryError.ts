export class UserAlreadyExistException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserAlreadyExistException";
    }
}

export class UserDoNotExistException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserDoNotExistException";
    }
}

export class InvalidCredentialException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidCredentialException";
    }
}