import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import {Room} from "../../model/room";
import {User} from "../../model/user";

@Injectable({
  providedIn: "root"
})
export class RoomService {
  constructor(private http: HttpClient) {}

  // getRooms(): Observable<Page<Room>> {
  //   return this.http.get<Page<Room>>('/api/rooms?page=0');
  // }

  // Ajax request for user data
  // getRooms(): Observable<Room[]> {
  //   return this.http.get<Room[]>("/api/rooms");
  // }

  getRooms(page: number, size: string): Observable<Room[]> {
    // if(userId)
    //   return this.http.get<Room[]>("/api/rooms?page="+page+"&size="+size+"&user_id="+userId);
    return this.http.get<Room[]>("/api/rooms?page="+page+"&size="+size);
  }

  getOwnRooms(page: number, size: string, userId: string): Observable<Room[]> {
    return this.http.get<Room[]>("/api/rooms/own?page="+page+"&size="+size+"&user_id="+userId);
  }

  getTotalPages(size: string, manager_id?: string): Observable<number> {
    let url: string = "/api/rooms/total-pages?size="+size;
    // if(userId)
    //   url += "&user_id=" + userId;
    if(manager_id)
      url += "&manager_id=" + manager_id;
    return this.http.get<number>(url);
  }

  getUsersInRoom(roomId: string): Observable<User[]> {
    return this.http.get<User[]>("/api/rooms/users?room_id="+roomId);
  }

  getRoomById(prodId: string): Observable<Room> {
    return this.http.get<Room>("/api/rooms/" + prodId);
  }

  saveRoom(room: Room): Observable<Room> {
    return this.http.post<Room>("/api/rooms", room);
  }

  deleteRoom(roomId: string): Observable<void> {
    return this.http.delete<void>("/api/rooms/" + roomId);
  }
}
