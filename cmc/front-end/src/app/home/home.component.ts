import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../data-models/employee';
import { IGroup } from '../data-models/group';
import { UserService } from "../user.service";
import { ApiService } from "../api.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    employee: IEmployee;
    contacts: any;
    public groups: Observable<IGroup[]>
    constructor(private _UserService: UserService, private _ApiService: ApiService, private router: Router) {
        this.employee = new IEmployee();
        this.groups = undefined;
        this.contacts = undefined;
    }
    ngOnInit() {
        this._ApiService.getGroupsForEmployee().subscribe(
            (resp) => { this.groups = resp },
            (err) => { console.log(err); }
        )
        this._ApiService.getContactsForEmployee().subscribe(
            (resp) => { this.contacts = resp },
            (err) => { console.log(err); }
        )
    }
    createGroup() {
        this.router.navigate(['/new-group']);
    }
    createContact() {
        this.router.navigate(['/new-contact']);
    }
}
