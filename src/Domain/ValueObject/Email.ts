import { InvalidEmailException } from "../Error/DomainError";

export class Email {
    private Email: string;

    constructor() {
        this.Email = "";
    }

    validate(email: string): boolean {
        if (!this.Email) {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getEmail(): string {
        return this.Email;
    }

    setEmail(email: string): void {
        if (this.validate(email)) {
            this.Email = email;
        }
        else {
            throw new InvalidEmailException("The Email is Invalid.");
        }
    }

}