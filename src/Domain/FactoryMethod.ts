import { User } from "./User"
import { Todo } from "./Todo";
import { Email } from "./ValueObject/Email";


export class Factory {

    UserFactoryMethod(id: string, name: string, email: string, password: string, todo: Todo[]) {
        return new User(id, name, email, password, todo);
    }

    TodoFactoryMethod(id: string, body: string, authorId: string) {
        return new Todo(id, body, authorId);
    }
}
