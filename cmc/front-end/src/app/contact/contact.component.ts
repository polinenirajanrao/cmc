import { Component, OnInit } from '@angular/core';
import { IContact } from '../data-models/contact';
import { UserService } from "../user.service";
@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    contact: IContact;
    response: any;
    err: any;
    success: boolean = false;
    constructor(private _UserService: UserService) {
        this.contact = new IContact();
    }
    ngOnInit() {

    }
    createContact() {
        this._UserService.createContact(this.contact).subscribe(
            (data) => {this.response = data; this.success=true},
            (err) => {console.log(err)}
        )
    }
}
