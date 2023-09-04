
class paginationData {
    private nextPage: number;
    private currentPage: number;
    private previousPage: number;
    private totalPages: number;
    private search: string;

    constructor(nextPage: number, currentPage: number, previousPage: number, totalPages: number, search: string) {
        this.nextPage = nextPage;
        this.currentPage = currentPage;
        this.previousPage = previousPage;
        this.totalPages = totalPages;
        this.search = search;
    }

    getNextPage(): number { return this.nextPage; }
    getCurrentPage(): number { return this.currentPage; }
    getPreviousPage(): number { return this.previousPage; }
    getTotalPages(): number { return this.totalPages; }
    getSearch(): string { return this.search; }

    setNextPage(nextPage: number) { this.nextPage = nextPage };
    setCurrentPage(currentPage: number) { this.currentPage = currentPage };
    setPreviousPage(previousPage: number) { this.previousPage = previousPage };
    setTotalPages(totalPages: number) { this.totalPages = totalPages };
    setSearch(search: string) { this.search = search };

}

export default paginationData;