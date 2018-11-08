import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse,} from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
// import { IPagination } from './data-models/pagination';

@Injectable()
export class ApiService {

  // http options used for making API calls
  private httpOptions: any;

   // http options used for making API calls with observe response
   private httpOptionsObserveResponse: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  // private pagination : IPagination;


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
        'Authorization': 'JWT ' + this._userService.token
      })
    };
    this.httpOptionsObserveResponse = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
        'Authorization': 'JWT ' + this._userService.token
      }),
      observe: 'response' 
    };
  }

    // Uses http.get() to get groups of an employee
    public getGroupsForEmployee():Observable<any> {
      // this.httpOptions.observe='response'
      return this.http.get('/groups-for-employee/', this.httpOptionsObserveResponse)
    }

    // Uses http.get() to get contacts of an employee
    public getContactsForGroup(group_id:string):Observable<any> {
      return this.http.get<any>(`/contacts-for-group/?group_id=${group_id}`, this.httpOptions)
    }

    // Uses http.get() to get group details
    public getGroupDetails(group_id:string):Observable<any> {
      return this.http.get(`/group-details/?group_id=${group_id}`, this.httpOptions)
    }

    // Uses http.get() to get group details
    public deleteGroup(group_id:string):Observable<any> {
      return this.http.get(`/group-details/?group_id=${group_id}`, this.httpOptions)
    }

    // Uses http.get() to get group details
    // public getPagination(headers):IPagination {
    //   this.pagination.has_next = headers.get('has_next');
    //   this.pagination.has_other_pages = headers.get('has_other_pages');
    //   this.pagination.has_previous = headers.get('has_previous');
    //   this.pagination.next_page_number=headers.get('next_page_number');
    //   this.pagination.number = headers.get('number');
    //   this.pagination.paginator_page_range = headers.get('paginator_page_range');
    //   this.pagination.previous_page_number = headers.get('previous_page_number');
    //   return this.pagination;
    // }

    getRangeArray(range: string){
      var first_index = range.charAt(6);
      var second_index = range.charAt(9);
      var i;
      var rangeArray = [];
      for(i=first_index; i<second_index; i++){
        rangeArray.push(Number(i));
      }

      return rangeArray;
    }

    // Uses http.get() to get group details
    public getGroupsByName(searchText:string):Observable<any> {
      return this.http.get(`/groups-by-name/?search_text=${searchText}`, this.httpOptions)
    }

    // Uses http.get() to get contact by search
    public searchContacts(searchText:string, searchBy:string):Observable<any> {
      return this.http.get(`/search-contacts/?search_text=${searchText}&search_by=${searchBy}`, this.httpOptions)
    }
}
