import {User} from "./user";

export class Room {
  id: string;
  name: string;
  password: string;
  description: string;
  max_users: number;
  user: User;
  users: User[];

  static cloneBase(room: Room): Room {
    let clonedRoom: Room = new Room();
    clonedRoom.id = room.id;
    clonedRoom.name = room.name;
    clonedRoom.password = room.password;
    clonedRoom.description= room.description;
    clonedRoom.max_users= room.max_users;
    clonedRoom.user = room.user;
    clonedRoom.users = room.users;
    return clonedRoom;
  }
}
