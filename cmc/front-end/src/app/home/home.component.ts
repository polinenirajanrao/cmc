import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../data-models/employee';
import { IPagination } from '../data-models/pagination';
import { IGroup } from '../data-models/group';
import { UserService } from "../user.service";
import { ApiService } from "../api.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    employee: IEmployee;
    contacts: any;
    public groups: any;
    public pagination: IPagination;
    private searchText: string;
    range
    constructor(private _UserService: UserService, private _ApiService: ApiService, private router: Router) {
        this.employee = new IEmployee();
        this.pagination = new IPagination();
        this.groups = [];
    }
    ngOnInit() {
        this._ApiService.getGroupsForEmployee().subscribe(
            (resp) => {
            this.groups = resp.body,
            this.pagination.has_next = resp.headers.get('has_next');
            this.pagination.has_other_pages = resp.headers.get('has_other_pages');
            this.pagination.has_previous = resp.headers.get('has_previous');
            this.pagination.next_page_number= resp.headers.get('next_page_number');
            this.pagination.number = resp.headers.get('number');
            this.pagination.paginator_page_range = resp.headers.get('paginator.page_range');
            var range = resp.headers.get('paginator.page_range');
            this.pagination.paginator_page_range = this._ApiService.getRangeArray(range)
            this.pagination.previous_page_number = resp.headers.get('previous_page_number');
            },
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
                        (resp) => { this.groups = resp.body },
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

    searchByName(searchText){
        this._ApiService.getGroupsByName(searchText).subscribe(
            (resp) => { this.groups = resp },
            (err) => { console.log(err), alert("search failed"); }
        )
    }

}
