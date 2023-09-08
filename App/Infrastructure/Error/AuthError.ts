export class InvalidTokenException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidTokenException";
    }
}

export class NoTokenException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoTokenException";
    }
}

export class TokenVerficationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TokenVerficationException"
    }
}
