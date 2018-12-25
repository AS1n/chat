import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>("/api/users");
  // }

  getBest(): Observable<User> {
    return this.http.get<User>("/api/users/best");
  }

  getUsers(page: number, size: string): Observable<User[]> {
    return this.http.get<User[]>("/api/users?page="+page+"&size="+size);
  }

  getTotalPages(size: string): Observable<number> {
    let url: string = "/api/users/total-pages?size="+size;
    return this.http.get<number>(url);
  }

  changeRole(user: User, newRole: number): Observable<User> {
    return this.http.post<User>("/api/users/change-role?new="+newRole, user);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>("/api/users", user);
  }

  // signupUser(user: User): Observable<User> {
  //   return this.http.post<User>("/api/users/signup", user);
  // }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>("/api/users/" + userId);
  }
}
