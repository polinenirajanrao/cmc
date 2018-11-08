import { Component, OnInit, ViewChild } from '@angular/core';
import { IContact } from '../data-models/contact';
import { UserService } from "../user.service";
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    @ViewChild("ContactForm") currentForm: NgForm;
    contact: IContact;
    response: any;
    err: any;
    success: boolean = false;
    error: boolean = false;
    groupId: string;
    contactId: string;
    is_edit: string;
    error_message: string;
    constructor(private _UserService: UserService, private _activeRoute: ActivatedRoute) {
        this.contact = new IContact();
    }
    ngOnInit() {
        this.groupId = this._activeRoute.snapshot.queryParamMap.get("group_id");
        this.contactId = this._activeRoute.snapshot.queryParamMap.get("contact_id");
        this.is_edit = this._activeRoute.snapshot.queryParamMap.get("is_edit");
        if (this.contactId != null) {
            this._UserService.getContact(this.contactId).subscribe(
                (res) => { this.contact = res }
            )
        }
    }
    createContact() {
        if (this.currentForm.invalid) {
            Object.keys(this.currentForm.controls).forEach(key => {
                this.currentForm.controls[key].markAsTouched();
            });
        } else {
            if (this.is_edit == null) {
                this.contact.group_id = this.groupId;
                this._UserService.createContact(this.contact).subscribe(
                    (data) => {
                    this.response = data;
                        this.success = true
                    },
                    (err) => {
                        console.log(err),
                        this.error = true;
                        this.error_message = err.error;
                    }
                );
            } else {
                // this.contact.group_id = this.groupId;
                this._UserService.putContact(this.contact).subscribe(
                    (data) => { this.response = data; this.success = true },
                    (err) => { console.log(err) }
                );
            }

        }
    }
}
