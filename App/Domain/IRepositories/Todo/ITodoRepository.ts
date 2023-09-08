import PaginationData from "../../../Infrastructure/utils/Pagination/paginationData";
import PaginationOptions from "../../../Infrastructure/utils/Pagination/paginationOption";

interface ITodoRepository {
    GetTodo(id: string, paginationOptions: PaginationOptions, paginationData: PaginationData): any;
    CreateTodo(id: string, body: string, userId: string): any;
    UpdateTodo(id: string, body: string): any;
    DeleteTodo(id: string): any;
}

export default ITodoRepository;