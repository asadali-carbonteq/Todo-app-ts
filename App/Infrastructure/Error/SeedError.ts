export class SeedingException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SeedingException";
    }
}