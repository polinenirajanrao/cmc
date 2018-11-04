import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../data-models/employee';
import {UserService} from "../user.service";
@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
    employee: IEmployee;
    response: any;
    err: any;
    success: boolean = false;
    constructor(private _UserService:UserService) {
        this.employee = new IEmployee();
    }
    ngOnInit() {

    }
    signUpUser() {
        this._UserService.register(this.employee).subscribe(
            (data) => {this.response = data; this.success=true},
            (err) => {console.log(err)}
        );
    }
}
