
interface ITodoRepository {
    GetTodo(id: string, pages: number, size: number): any;
    CreateTodo(id: string, body: string, userId: string): any;
    UpdateTodo(id: string, body: string): any;
    DeleteTodo(id: string): any;
}

export default ITodoRepository;