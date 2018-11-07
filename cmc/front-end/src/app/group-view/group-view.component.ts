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
    group: {
        'group_name': undefined,
        'id': undefined,
        'employee': undefined,
        'is_active': undefined
    };

    public groups: Observable<IGroup[]>
    constructor(private _UserService: UserService, private _ApiService: ApiService, private router: Router, private _activeRoute: ActivatedRoute) {
        this.contacts = [];
        this.group = {
            'group_name': undefined,
            'id': undefined,
            'employee': undefined,
            'is_active': undefined
        };
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

    editContact(contact){
        this.router.navigate(['/new-contact/{{groupId.id}}', { 'contact': contact, 'is_edit': true}]);
    }

    deleteContact(contact_id) {
        if (confirm("Do you really want to delete the contact?")) {
            this._UserService.deleteContact(contact_id).subscribe(
                (resp) => {
                        this._ApiService.getContactsForGroup(this.groupId).subscribe(
                            (resp) => { this.contacts = resp },
                            (err) => { console.log(err); }
                        ), alert("Contact Deleted")
                },
                (err) => { console.log(err); }
            )
        } else {
            alert("cancelled")
        }
    }

    onStatusChange(eve: any, contact_id) {
        this._UserService.toggleContactStatus(contact_id).subscribe(
            (resp) => { alert("contact status changed"); },
            (err) => { console.log(err), alert("changing contact status failed"); }
        )
    }
}
