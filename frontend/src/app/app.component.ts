import {Component, OnInit} from '@angular/core';
import { User } from "./model/user";
import {AuthService} from "./service/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'frontend';

  public currentUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUser();
  }

  private loadUser():void {
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    })
  }

}
