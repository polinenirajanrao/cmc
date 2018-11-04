import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];



  constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router) {
    // CSRF token is needed to make API calls work when logged in
    let csrf = this._cookieService.get("csrftoken");
    // the Angular HttpHeaders class throws an exception if any of the values are undefined
    if (typeof (csrf) === 'undefined') {
      csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
        'Authorization': 'JWT ' + this.token })
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
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];
    let csrf = this._cookieService.get("csrftoken");
    // the Angular HttpHeaders class throws an exception if any of the values are undefined
    if (typeof (csrf) === 'undefined') {
      csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
        'Authorization': 'JWT ' + this.token })
    };
    localStorage.setItem["cmc-auth-token"] = (this.token);
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  // Uses http.post() to register a employee
  public register(employee) {
    this.http.post('/register/', JSON.stringify(employee), this.httpOptions).subscribe(
      data => {
        console.log('registration success', data);
      },
      err => {
        console.error('registration error', err);
        this.errors = err['error'];
      }
    );
  }


  // Uses http.post() to create a group
  public createGroup(group) {
    this.http.post('/create-group/', JSON.stringify(group), this.httpOptions).subscribe(
      data => {
        console.log('registration success', data);
      },
      err => {
        console.error('registration error', err);
        this.errors = err['error'];
      }
    );
  }

  // Uses http.post() to create a group
  public createContact(contact) {
    this.http.post('/create-contact/', JSON.stringify(contact), this.httpOptions).subscribe(
      data => {
        console.log('registration success', data);
      },
      err => {
        console.error('registration error', err);
        this.errors = err['error'];
      }
    );
  }

}
