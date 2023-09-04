
class paginationOptions {
    private pages: number;
    private pageSize: number;

    constructor(pages: number, pageSize: number) {
        this.pages = pages;
        this.pageSize = pageSize
    }

    getPages(): number { return this.pages; }
    getPageSize(): number { return this.pageSize; }

    setPages(pages: number) { this.pages = pages; }
    setPageSize(pageSize: number) { this.pageSize = pageSize; }
}

const paginationOption = {
    //
}

export default paginationOptions;