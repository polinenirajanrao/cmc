export interface IGroup {
    group_name: string;
    employee_id : string;
    is_active: string;
}
export class IGroup implements IGroup {
    constructor() {
        this.group_name = "";
        this.employee_id = "";
        this.is_active = "";
    }
}