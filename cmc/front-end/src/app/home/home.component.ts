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
    public groups: any;
    constructor(private _UserService: UserService, private _ApiService: ApiService, private router: Router) {
        this.employee = new IEmployee();
        this.groups = [];
    }
    ngOnInit() {
        this._ApiService.getGroupsForEmployee().subscribe(
            (resp) => { this.groups = resp },
            (err) => { console.log(err); }
        )
    }
    createGroup() {
        this.router.navigate(['/new-group']);
    }
    deleteGroup(group_id) {
        if (confirm("Do you really want to delete the group?")) {
            this._UserService.deleteGroup(group_id).subscribe(
                (resp) => {
                    this._ApiService.getGroupsForEmployee().subscribe(
                        (resp) => { this.groups = resp },
                        (err) => { console.log(err); }
                    ), alert("Group Deleted")
                },
                (err) => { console.log(err); }
            )
        } else {
            alert("cancelled")
        }
    }

  onStatusChange(eve: any, group_id) {
    this._UserService.toggleGroupStatus(group_id).subscribe(
        (resp) => { alert("group status changed"); },
        (err) => { console.log(err), alert("changing group status failed"); }
    )
  }

}
