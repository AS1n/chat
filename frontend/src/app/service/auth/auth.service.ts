import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {TokenStorage} from "./token.storage";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  private loginUrl = '/token/generate-token';
  private signupUrl = '/api/users/signup';
  private getUserUrl = '/api/users/get-current-user';

  constructor(
    private http: HttpClient
  ) {}

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {login: username, password: password};
    console.log('attempAuth ::');
    return this.http.post(this.loginUrl, credentials, httpOptions);
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.signupUrl, user, httpOptions);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.getUserUrl);
  }

}
