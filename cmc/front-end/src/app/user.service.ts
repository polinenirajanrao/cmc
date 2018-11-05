import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IuserDetails } from "./data-models/user"

@Injectable()
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  private httpOptionsAllowAny: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  public interface
  public user_details: IuserDetails = new IuserDetails();

  constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router) {
    // CSRF token is needed to make API calls work when logged in
    let csrf = this._cookieService.get("csrftoken");
    // the Angular HttpHeaders class throws an exception if any of the values are undefined
    if (typeof (csrf) === 'undefined') {
      csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
        'Authorization': 'JWT ' + this.token
      })
    };
    this.httpOptionsAllowAny = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-CSRFToken': csrf })
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post('/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        console.log('login success', data);
        this.updateData(data['token']);
        this.router.navigate(['/home']);
      },
      err => {
        console.error('login error', err);
        this.errors = err['error'];
      }
    );
  }

  /**
   * Refreshes the JWT token, to extend the time the user is logged in
   */
  public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
      data => {
        console.log('refresh success', data);
        this.updateData(data['token']);
      },
      err => {
        console.error('refresh error', err);
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    localStorage.setItem('jwt-token', undefined);
    localStorage.setItem('first_name', undefined);
    localStorage.setItem('last_name', undefined);
  }

  private updateData(token) {
    this.token = token;
    localStorage.setItem('jwt-token', token);
    this.errors = [];
    let csrf = this._cookieService.get("csrftoken");
    // the Angular HttpHeaders class throws an exception if any of the values are undefined
    if (typeof (csrf) === 'undefined') {
      csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
        'Authorization': 'JWT ' + this.token
      })
    };
    this.getEmployeeDetails();
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  // Uses http.post() to register a employee
  public register(employee):Observable<any> {
    return this.http.post('/register/', JSON.stringify(employee), this.httpOptionsAllowAny)
  }


  // Uses http.post() to create a group
  public createGroup(group):Observable<any> {
    return this.http.post('/create-group/', JSON.stringify(group), this.httpOptions)
  }

  // Uses http.post() to create a contact
  public createContact(contact):Observable<any> {
    return this.http.post('/create-contact/', JSON.stringify(contact), this.httpOptions)
  }

  // Uses http.get() to get user details
  public getEmployeeDetails() {
    this.http.get('/get-current-employee/', this.httpOptions).subscribe(
      (data) => {
        this.user_details.first_name = data["first_name"];
        this.user_details.last_name = data["last_name"];
        localStorage.setItem('first_name', this.user_details.first_name);
        localStorage.setItem('last_name', this.user_details.last_name);
        this.user_details.emp_id = data["emp_id"];
        this.user_details.email = data["email"];
        this.user_details.user = data["user"];
        this.user_details.id = data["id"];
        this.user_details.aadhar_no = data["aadhar_no"];
      }, (err) => {
        console.log(err)
      }
    );
  }

  public getUserDetails() {
    return this.user_details;
  }

  public resetUserDetails(){
    this.user_details.first_name = "";
    this.user_details.last_name = "";
    this.user_details.emp_id = null;
    this.user_details.email = "";
    this.user_details.user = null;
    this.user_details.id = null;
    this.user_details.aadhar_no = "";
  }

  // Uses http.post() to deactivate a group
  public deactivateGroup(group_id):Observable<any> {
    return this.http.post('/deactivate-group/', JSON.stringify({'group_id': group_id}), this.httpOptions)
  }
  
  // Uses http.post() to deactivate a contact
  public deactivateContact(contact_id):Observable<any> {
    return this.http.post('/deactivate-contact/', JSON.stringify({'contact_id': contact_id}), this.httpOptions)
  }

  // Uses http.post() to add a contact to group
  public addContacttoGroup(contact_id, group_id):Observable<any> {
    return this.http.post('/add-contact-to-group/', JSON.stringify({'contact_id': contact_id, 'group_id': group_id}), this.httpOptions)
  }

  // Uses http.post() to delete a group
  public deleteGroup(group_id):Observable<any> {
    return this.http.post('/delete-group/', JSON.stringify({'group_id': group_id}), this.httpOptions)
  }

  // Uses http.post() to delet a contact
  public deleteContact(contact_id):Observable<any> {
    return this.http.post('/delete-contact/', JSON.stringify({'contact_id': contact_id}), this.httpOptions)
  }

}
