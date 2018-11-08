export interface IPagination {
    has_other_pages : boolean ;
    has_previous : boolean;
    previous_page_number : any;
    number : any;
    paginator_page_range : any;
    has_next : boolean;
    next_page_number : any;
}
export class IPagination implements IPagination {
    constructor() {
        this.has_other_pages = false;
        this.has_previous = false;
        this.previous_page_number = "";
        this.number = "";
        this.paginator_page_range = "";
        this.has_next = false;
        this.next_page_number = "";
    }
}