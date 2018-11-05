import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../data-models/employee';
import { IGroup } from '../data-models/group';
import { UserService } from "../user.service";
import { ApiService } from "../api.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
    selector: 'home',
    templateUrl: './group-view.component.html',
    styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {
    contacts: any;
    groupId: string;
    group: {};
    public groups: Observable<IGroup[]>
    constructor(private _UserService: UserService, private _ApiService: ApiService, private router: Router, private _activeRoute: ActivatedRoute) {
        this.contacts = undefined;
    }
    ngOnInit() {
        this.groupId = this._activeRoute.snapshot.paramMap.get("group_id");
        this._ApiService.getContactsForGroup(this.groupId).subscribe(
            (resp) => { this.contacts = resp },
            (err) => { console.log(err); }
        )
        this._ApiService.getGroupDetails(this.groupId).subscribe(
            (resp) => { this.group = resp },
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
