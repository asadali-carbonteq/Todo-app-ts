import { Todo } from "../../Domain/FactoryMethod";


export default interface ITodoRepository {
    GetTodo(authorId: string, pages: number, size: number): Promise<any>;
    CreateTodo(todo: Todo): Promise<any>;
    UpdateTodo(body: string, id: string): Promise<any>;
    DeleteTodo(id: string): Promise<any>;
}