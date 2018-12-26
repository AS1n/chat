import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../service/room/room.service";
import {AuthService} from "../service/auth/auth.service";
import {Subscription} from "rxjs";
import {Room} from "../model/room";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  public editMode: boolean;
  public formGroup: FormGroup;
  public currentPage: number = 1;
  public currentUser: User;

  public editableRoom: Room;

  public userId: string = '0';
  public enteredPassword: string;
  public incorrect: boolean = false;
  
  public rooms: Room[];
  public selectedRoom: Room;

  public size: string = '6';
  public totalPages: number;
  public pages: number[] = [];
  public modalRef: BsModalRef;

  private subscriptions: Subscription[] = [];

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private modalService: BsModalService,
    private loadingService: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getId();

  }

  private getId(): void {
    this.loadingService.show();
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        if(!params.has('id')) {
          this.userId = '0';
        }
        else {
          this.userId = params.get('id');
        }
        this.loadUser();
      }))
  }

  public onSubmit(): void {
    this.createRoom();
  }

  createRoom(): void {
    // let room: Room;
    // room.name = this.formGroup.value.Name;
    // room.password = this.formGroup.value.Password;
    // room.max_users = this.formGroup.value.MaxUsers;
    // room.description = this.formGroup.value.Description;
    this.getFields();
    console.log(this.editableRoom);
    this.subscriptions.push(
      this.roomService.saveRoom(this.editableRoom).subscribe((answer) => {
        if(answer==null)
          this.incorrect = true;
        else {
          this._closeModal();
          this.loadRooms();
        }
      })
    )
  }

  public _closeModal(): void {
    this.modalRef.hide();
  }

  public _openModal(template: TemplateRef<any>, room?: Room): void {
    if(room){
      this.editMode = true;
      this.editableRoom = room;
      this.setFields();
    }
    else {
      this.editMode = false;
      this.editableRoom = new Room();
      this.setFields();
    }
    this.modalRef = this.modalService.show(template);
  }

  public _openEnterModal(template: TemplateRef<any>, room: Room): void {
    if(this.currentUser.role.id == '3') {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedRoom = room;
    this.modalRef = this.modalService.show(template);
  }

  public loadRooms(): void {
    if(this.userId=='0')
      this.subscriptions.push(
        this.roomService.getRooms(this.currentPage, this.size).subscribe(rooms => {
          this.rooms = rooms;
          console.log(rooms);
          this.getTotalPagesNumber();
        })
      );
    else this.subscriptions.push(
      this.roomService.getOwnRooms(this.currentPage, this.size, this.userId).subscribe( rooms => {
        this.rooms = rooms;
        console.log(rooms);
        this.getTotalPagesNumber();
      })
    )
  }

  private getTotalPagesNumber(): void {
    this.subscriptions.push(
      this.roomService.getTotalPages(this.size).subscribe(num => {
        this.totalPages = num;
        this.pages = [];
        for(let i=1; i<=this.totalPages; i++) {
          this.pages.push(i);
        }
        this.loadingService.hide();
      })
    );
  }

  public loadNext(): void {
    this.currentPage++;
    this.loadRooms();
  }

  public loadPrev(): void {
    this.currentPage--;
    this.loadRooms();
  }

  public loadUser(): void {
    this.subscriptions.push(
      this.authService.getUser().subscribe(user => {
        this.currentUser = user;
        if(this.userId != '0' && this.currentUser.id != this.userId)
          this.router.navigate(['']);
        this.loadRooms();
      })
    )
  }

  goToRoom(): void {
    if(this.selectedRoom.password == this.enteredPassword){
      this._closeModal();
      this.router.navigate(["/rooms/id/"+this.selectedRoom.id]);
      // todo: saving this connection on database
    }
    else this.incorrect = true;
  }

  getFields(): void {
    this.editableRoom.name = this.formGroup.value.Name;
    this.editableRoom.password = this.formGroup.value.Password;
    this.editableRoom.description = this.formGroup.value.Description;
    this.editableRoom.max_users = this.formGroup.value.MaxUsers;
    this.editableRoom.user = this.currentUser;
    // this.editableRoom.users = [];
    // this.editableRoom.users.push(this.currentUser);
  }

  setFields(): void {
    this.formGroup = new FormGroup({
      Name: new FormControl(this.editableRoom.name, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/),
        Validators.maxLength(35)
      ]),
      Password: new FormControl('Password', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/),
        Validators.maxLength(20),
        Validators.minLength(4)
      ]),
      Description: new FormControl(this.editableRoom.description, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]/),
        Validators.maxLength(250)
      ]),
      MaxUsers: new FormControl(this.editableRoom.max_users, [
        Validators.required,
        Validators.maxLength(3)
      ])
    });
  }

  closeAlert(): void {
    this.incorrect = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
