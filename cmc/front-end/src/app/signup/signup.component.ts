import { Component, OnInit, ViewChild } from '@angular/core';
import { IEmployee } from '../data-models/employee';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
    @ViewChild("signUpForm") currentForm: NgForm;
    employee: IEmployee;
    response: any;
    err: any;
    success: boolean = false;
    error: boolean = false;
    error_message: string;
    constructor(private _UserService: UserService) {
        this.employee = new IEmployee();
    }
    ngOnInit() {

    }
    signUpUser() {
        if (this.currentForm.invalid) {
            Object.keys(this.currentForm.controls).forEach(key => {
                this.currentForm.controls[key].markAsTouched();
            });
            // alert("Please fill all the required fields.")
        } else {
            this._UserService.register(this.employee).subscribe(
                (data) => {
                this.response = data;
                    this.success = true
                },
                (err) => {
                    console.log(err);
                    this.error = true;
                    this.error_message = err.error;
                }
            );
        }
    }
}
