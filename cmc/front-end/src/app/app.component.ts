import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private user: any = {};

  private token: any;

  private token_expires: any;

  constructor(private _UserService: UserService, private _router: Router) { }

  ngOnInit() {
    this.user = this._UserService.getUserDetails();
    if(localStorage.getItem("jwt-token")==="undefined"){
      this._router.navigate(['/signin']);
    } else {
      this.token = localStorage.getItem("jwt-token");
      const token_parts = this.token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      this.token_expires = new Date(token_decoded.exp * 1000);
      if(this.token_expires > new Date()){
        this._UserService.updateData(this.token)
        this._UserService.token = localStorage.getItem("jwt-token");
        this.user.first_name = localStorage.getItem("first_name");
        this.user.last_name = localStorage.getItem("last_name");
      } else {
        this._UserService.refreshToken();
      }
      
    }
  }


}
