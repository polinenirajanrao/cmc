import { Component, OnInit, ViewChild } from '@angular/core';
import { Iuser } from '../data-models/user';
import { UserService } from "../user.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'sign-in',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
    @ViewChild("signInForm") currentForm: NgForm;
    user: Iuser;
    loginFailed: boolean = false;
    loginErrorMessage: string;

    // error messages received from the login attempt
    public errors: any = [];

    constructor(private _UserService: UserService, private router: Router) {
        this.user = new Iuser();
    }
    ngOnInit() {
        this._UserService.logout();
        setTimeout(() => {
            this._UserService.resetUserDetails();
        }, 0);
    }
    signInUser() {
        if (this.currentForm.invalid) {
            Object.keys(this.currentForm.controls).forEach(key => {
                this.currentForm.controls[key].markAsTouched();
            });
        } else {
            this._UserService.login(this.user).subscribe(
                data => {
                    console.log('login success', data);
                    this._UserService.updateData(data['token']);
                    this.router.navigate(['/home']);
                },
                err => {
                    console.error('login error', err);
                    this.errors = err['error'];
                    this._UserService.errors = err['error']
                    this.loginFailed = true;
                    this.loginErrorMessage = this.errors.non_field_errors[0];
                }
            );
        }
    }
}
