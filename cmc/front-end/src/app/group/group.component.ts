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
    constructor(private _UserService: UserService) {
        this.group = new IGroup();
    }
    ngOnInit() {

    }
    createGroup() {
        this._UserService.createGroup(this.group)
    }
}
