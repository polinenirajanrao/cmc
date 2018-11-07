import { Component, OnInit, ViewChild } from '@angular/core';
import { IGroup } from '../data-models/group';
import { UserService } from "../user.service";
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    @ViewChild("GroupForm") currentForm: NgForm;
    group: IGroup;
    response: any;
    err: any;
    success: boolean = false;
    groupId: string;
    is_edit: string;
    constructor(private _UserService: UserService, private _activeRoute: ActivatedRoute) {
        this.group = new IGroup();
    }
    ngOnInit() {
        this.groupId = this._activeRoute.snapshot.queryParamMap.get("group_id");
        this.is_edit = this._activeRoute.snapshot.queryParamMap.get("is_edit");
        if (this.groupId != null) {
            this._UserService.getGroup(this.groupId).subscribe(
                (res) => { this.group = res }
            )
        }
    }
    createGroup() {
        if (this.currentForm.invalid) {
            Object.keys(this.currentForm.controls).forEach(key => {
                this.currentForm.controls[key].markAsTouched();
            });
        } else {
            if(this.is_edit == null){
                this._UserService.createGroup(this.group).subscribe(
                    (data) => { this.response = data; this.success = true },
                    (err) => { console.log(err) }
                );
            } else {
                this._UserService.putGroup(this.group).subscribe(
                    (data) => { this.response = data; this.success = true },
                    (err) => { console.log(err) }
                );
            }
            
        }
    }
}
