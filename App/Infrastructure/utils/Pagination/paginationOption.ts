
class PaginationOptions {
    private pages: number;
    private pageSize: number;
    private search: string;

    constructor(pages: number, pageSize: number, search: string) {
        this.pages = pages;
        this.pageSize = pageSize;
        this.search = search;
    }

    getPage(): number { return this.pages; }
    getPageSize(): number { return this.pageSize; }
    getSearch(): string { return this.search }


    setPages(pages: number) { this.pages = pages; }
    setPageSize(pageSize: number) { this.pageSize = pageSize; }
    setSearch(search: string) { this.search = search }
}


export default PaginationOptions;