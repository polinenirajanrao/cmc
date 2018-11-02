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