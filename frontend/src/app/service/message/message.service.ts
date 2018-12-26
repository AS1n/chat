import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Message} from "../../model/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>("/api/messages");
  }

  getMessagesByRoom(page: string, size: string, room_id: string): Observable<Message[]> {
    return this.http.get<Message[]>("/api/messages?page="+page+"&size="+size+"&room_id="+room_id);
  }

  saveMessage(message: Message): Observable<Message> {
    return this.http.post<Message>("/api/messages", message);
  }

  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>("/api/messages/" + messageId);
  }

}
