// import { Todo } from "../../../Domain/Todo/Todo";
import { Todo } from "@prisma/client";

class PaginationData {
    private nextPage: number;
    private currentPage: number;
    private previousPage: number;
    private totalPages: number;
    private search: string;
    private items: Todo[] = [];

    constructor(nextPage: number, currentPage: number, previousPage: number, totalPages: number, search: string) {
        this.nextPage = nextPage;
        this.currentPage = currentPage;
        this.previousPage = previousPage;
        this.totalPages = totalPages;
        this.search = search;
        this.items = [];
    }

    getNextPage(): number { return this.nextPage; }
    getCurrentPage(): number { return this.currentPage; }
    getPreviousPage(): number { return this.previousPage; }
    getTotalPages(): number { return this.totalPages; }
    getSearch(): string { return this.search; }
    getItems(): Todo[] { return this.items }

    setNextPage(nextPage: number) { this.nextPage = nextPage };
    setCurrentPage(currentPage: number) { this.currentPage = currentPage };
    setPreviousPage(previousPage: number) { this.previousPage = previousPage };
    setTotalPages(totalPages: number) { this.totalPages = totalPages };
    setSearch(search: string) { this.search = search };
    setItems(todo: Todo[]) {
        this.items = todo;
    }
}

export default PaginationData;