import { Component, OnInit } from '@angular/core';
import { IGroup } from '../data-models/group';
import { UserService } from "../user.service";
@Component({
    selector: 'group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    group: IGroup;
    response: any;
    err: any;
    success: boolean = false;
    constructor(private _UserService: UserService) {
        this.group = new IGroup();
    }
    ngOnInit() {

    }
    createGroup() {
        this._UserService.createGroup(this.group).subscribe(
            (data) => {this.response = data; this.success=true},
            (err) => {console.log(err)}
        )
    }
}
