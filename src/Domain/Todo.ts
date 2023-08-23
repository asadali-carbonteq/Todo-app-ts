export class Todo {
    private id: string;
    private body: string;
    private authorId: string;

    constructor(id: string, body: string, authorId: string) {
        this.id = id;
        this.body = body;
        this.authorId = authorId;
    }

    setId(id: string): void { this.id = id; };
    setBody(body: string): void { this.body = body; };
    setAuthorId(authorId: string): void { this.authorId = authorId; };

    getId(): string { return this.id };
    getBody(): string { return this.body };
    getAuthorId(): string { return this.authorId };
}

export function TodoFactoryMethod(id: string, body: string, authorId: string) {
    return new Todo(id, body, authorId);
}