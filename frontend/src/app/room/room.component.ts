import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth/auth.service";
import {RoomService} from "../service/room/room.service";
import {Room} from "../model/room";
import {MessageService} from "../service/message/message.service";
import {Message} from "../model/message";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  public rooId: string;
  public room: Room;
  public messages: Message[];
  public users: User[];
  public message: string;

  public formGroup: FormGroup;
  public currentUser: User;

  private subscriptions = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private messageService: MessageService,
    private authService: AuthService,
    private loadingService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getId();
  }

  private getId(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.rooId = params.get('id');
        this.setUser();
      })
    );
  }

  private loadRoom(): void {
    this.subscriptions.push(
      this.roomService.getRoomById(this.rooId).subscribe(
        room => {
          this.room = room as Room;
          console.log(this.room);
          this.loadUsers();
          this.loadMessages();
        }
      )
    );
  }

  private setUser(): void {
    this.loadingService.show();
    this.subscriptions.push(
      this.authService.getUser().subscribe(user => {
          this.currentUser = user;
          this.loadRoom();
        }
      )
    );
  }

  private loadUsers(): void {
    this.subscriptions.push(
      this.roomService.getUsersInRoom(this.room.id).subscribe(users => {
        this.users = users;
      })
    )
  }

  private loadMessages(): void {
    this.subscriptions.push(
      this.messageService.getMessagesByRoom('1','10',this.room.id).subscribe(messages => {
        this.messages = messages as Message[];
        console.log(messages);
        this.loadingService.hide();
      })
    )
  }

  sendMessage(): void {
    this.subscriptions.push(
      this.messageService.saveMessage(this.createMessage()).subscribe(() => {
        this.loadMessages();
      })
    )
  }

  createMessage(): Message {
    let message = new Message();
    message.message = this.message;
    message.room = this.room;
    message.user = this.currentUser;
    console.log(message);
    this.message = '';
    return message;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
