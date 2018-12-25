import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from "./service/auth/token.storage";

import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { HttpEvent } from "@angular/common/http/src/response";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor works");
    let authReq = req;
    console.log(this.token.getToken());
    if (this.token.getToken() != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    console.log(authReq);
    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("Interceptor log response", event);
          // this.router.navigate(['']);
        }
      }, (err: any) => {
        console.log('req url :: ' + req.url);
        console.error("Interceptor log error", err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['login']);
          }
        }
      }
    ));
  }

}
