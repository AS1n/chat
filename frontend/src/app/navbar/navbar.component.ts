import {Component, NgZone, OnDestroy, OnInit, TemplateRef} from "@angular/core";
import {AuthService} from "../service/auth/auth.service";
import {User} from "../model/user";
import {Subscription} from "rxjs";
import {TokenStorage} from "../service/auth/token.storage";
import {Router} from "@angular/router";
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UserService} from "../service/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public role: string = '3';
  public currentUser: User;

  public incorrect: boolean = false;

  public editUserGroup: FormGroup;

  public modalRef: BsModalRef;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private storage: TokenStorage,
              private modalService: BsModalService,
              private router: Router
  ) {}

  ngOnInit() {
    // this.formGroup = new FormGroup({
    //   Name: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/),
    //     Validators.maxLength(35)
    //   ])
    // });
    this.loadUser();
  }

  signOut(): void {
    this.storage.signOut();
    this.loadUser();
    this.router.navigate(['']);
  }

  public _openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  // editUser(): void {
  //   this.setFields();
  //   this.subscriptions.push(
  //     this.userService.saveUser(this.currentUser).subscribe(user => {
  //       if(!user) {
  //         this.incorrect = true;
  //         return;
  //       }
  //       this.authService.attemptAuth(this.currentUser.username, this.currentUser.password).subscribe(
  //         data => {
  //           this.storage.saveToken(data.token);
  //           this.loadUser();
  //           this._closeModal();
  //         }, () => {
  //           this.incorrect = true;
  //         }
  //       );
  //     })
  //   )
  // }

  private loadUser(): void {
    this.subscriptions.push(
      this.authService.getUser().subscribe(user => {
        if(user) {
          this.currentUser = user;
          this.role = user.role.id;
          this.getFields();
        }
      })
    )
  }

  setFields(): void {
    this.currentUser.username = this.editUserGroup.value.Username;
  }

  getFields(): void {
    this.editUserGroup = new FormGroup({
      Username: new FormControl(this.currentUser.username, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/),
        Validators.minLength(4),
        Validators.maxLength(35)
      ])
    });
    // this.editUserGroup.value.Username = ;
  }

  public _closeModal(): void {
    this.modalRef.hide();
  }

  closeAlert(): void {
    this.incorrect = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
