export interface IContact {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    created_emp: string;
    group_id: string;
}
export class IContact implements IContact {
    constructor() {
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.phone = "";
        this.created_emp = "";
        this.group_id = "";
    }
}