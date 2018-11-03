export interface IEmployee {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    aadhar: string;
    employee_id: string;
}
export class IEmployee implements IEmployee {
    constructor() {
        this.email = "";
        this.password = "";
        this.first_name = "";
        this.last_name = "";
        this.aadhar = "";
        this.employee_id = "";
    }
}