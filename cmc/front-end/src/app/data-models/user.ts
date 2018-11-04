export interface Iuser {
    username: string;
    password: string;
}
export class Iuser implements Iuser {
    constructor() {
        this.username = "";
        this.password = "";
    }
}

export interface IuserDetails {
    first_name: string;
    last_name: string;
    emp_id: number;
    email: string;
    user: number;
    id: number;
    aadhar_no: string
};
export class IuserDetails implements IuserDetails {
    constructor() {
        this.first_name = "";
        this.last_name = "";
        this.emp_id = null;
        this.email = "";
        this.user = null;
        this.id = null;
        this.aadhar_no = "";
    }
};