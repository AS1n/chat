import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
// const USER_LOGIN = 'UserLogin';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.removeItem(USER_LOGIN);
    window.sessionStorage.clear();
  }

  public saveToken(token: string /*, username: string*/) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    // window.sessionStorage.removeItem(USER_LOGIN);
    // window.sessionStorage.setItem(USER_LOGIN, username);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // public getUsername(): string {
  //   return sessionStorage.getItem(USER_LOGIN);
  // }
}
