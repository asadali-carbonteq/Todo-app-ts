

export class UserNotCreatedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotCreatedException";
    }
}

export class UserNotDeletedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotDeletedException";
    }
}

export class UserNotUpdatedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotUpdatedException";
    }
}


