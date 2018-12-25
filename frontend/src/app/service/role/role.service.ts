import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";
import {Role} from "../../model/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>("/api/roles");
  }
}
