import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

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


  constructor(private http: HttpClient, private _cookieService:CookieService, private _userService: UserService) {
    // CSRF token is needed to make API calls work when logged in
    let csrf = this._cookieService.get("csrftoken");
    // the Angular HttpHeaders class throws an exception if any of the values are undefined
    if (typeof(csrf) === 'undefined') {
          csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
        'Authorization': 'JWT ' + this._userService.token })
    };
  }

    // Uses http.get() to get groups of an employee
    public getGroupsForEmployee():Observable<any> {
      return this.http.get('/groups-for-employee/', this.httpOptions)
    }

    // Uses http.get() to get contacts of an employee
    public getContactsForEmployee():Observable<any> {
      return this.http.get('/contacts-for-employee/', this.httpOptions)
    }

}
