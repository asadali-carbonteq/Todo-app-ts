import { InvalidEmailException } from "../../Infrastructure/Error/DomainError";

export class Email {
    private Email: string;

    constructor() {
        this.Email = "";
    }

    validate(email: string): boolean {
        if (!email) {
            return false;
        }
        const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
