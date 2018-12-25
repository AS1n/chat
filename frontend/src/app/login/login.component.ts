import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../service/auth/auth.service";
import { TokenStorage } from "../service/auth/token.storage";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public username: string;
  // public password: string;
  public incorrect: boolean = false;

  formGroup: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private zone: NgZone,
              private token: TokenStorage)
  {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      Username: new FormControl('', [
        Validators.required//,
        // Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/),
        // Validators.maxLength(35)
      ]),
      Password: new FormControl('', [
        Validators.required,
        // this.passwordValidator,
        // Validators.minLength(6),
        // Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    this.login();
  }


  login(): void {
    this.authService.attemptAuth(this.formGroup.value.Username, this.formGroup.value.Password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.reloadPage();
        this.router.navigate(['']);
      }, () => {
        this.incorrect = true;
      }
    );
  }

  closeAlert(): void {
    this.incorrect = false;
  }

  reloadPage() {
    this.zone.runOutsideAngular(() => {
      location.reload();
    })
  }


}
