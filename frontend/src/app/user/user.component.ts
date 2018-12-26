import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { User } from "../model/user";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs/internal/Subscription";
import { UserService } from "../service/user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Role} from "../model/role";
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";

@Component({
  selector: "app-users",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnDestroy {

  public size: string = '10';
  public currentPage: number = 1;
  public totalPages: number;
  public pages: number[] = [];

  public users: User[];
  public roles: Role[];
  public roleId: number;
  public editableUser: User = new User();
  public modalRef: BsModalRef;

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    // private roleService: MessageService,
    private modalService: BsModalService,
    private loadingService: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.loadUsers();
    // this.loadRoles();
  }

  public _closeModal(): void {
    this.modalRef.hide();
  }

  public _openModal(template: TemplateRef<any>, user: User): void {
    this.editableUser = User.cloneBase(user);
    this.modalRef = this.modalService.show(template);
  }

  public _addUser(): void {
    this.loadingService.show();
    this.subscriptions.push(
      this.userService.saveUser(this.editableUser).subscribe(() => {
        this.refreshUser();
        this.loadUsers();
        this._closeModal();
        this.loadingService.hide();
      })
    );
  }


  public _deleteUser(userId: string): void {
    this.loadingService.show();
    this.subscriptions.push(
      this.userService.deleteUser(userId).subscribe(() => {
        // this._updateUsers();
        this.loadUsers();
        this.loadingService.hide();
      })
    );
  }

  private refreshUser(): void {
    this.editableUser = new User();
  }

  private loadUsers(): void {
    this.loadingService.show();
    this.subscriptions.push(
      this.userService.getUsers(this.currentPage, this.size).subscribe(users => {
        this.users = users as User[];
        this.getTotalPagesNumber();
        this.loadingService.hide();
      })
    );
  }

  private getTotalPagesNumber(): void {
    this.subscriptions.push(
      this.userService.getTotalPages(this.size).subscribe(num => {
        this.totalPages = num;
        this.pages = [];
        for(let i=1; i<=this.totalPages; i++) {
          this.pages.push(i);
        }
        this.loadingService.hide();
      })
    );
  }

  // private loadRoles(): void {
  //   this.subscriptions.push(
  //     this.roleService.getRoles().subscribe(roles => {
  //       this.roles = roles;
  //     })
  //   )
  // }

  public loadNext(): void {
    this.currentPage++;
    this.loadUsers();
  }

  public loadPrev(): void {
    this.currentPage--;
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
