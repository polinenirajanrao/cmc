import { Component, OnInit } from '@angular/core';
import { Iuser } from '../data-models/user';
import {UserService} from "../user.service";
@Component({
    selector: 'sign-in',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
    user: Iuser;
    constructor(private _UserService:UserService) {
        this.user = new Iuser();
    }
    ngOnInit() {

    }
    signInUser() {
        console.log(this.user);
        this._UserService.login(this.user)
    }
}
