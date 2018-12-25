import {Room} from "./room";
import {User} from "./user";

export class Message {
  id: string;
  message: string;
  user: User;
  room: Room;

  static cloneBase(message: Message): Message {
    let clonedMessage: Message = new Message();
    clonedMessage.id = message.id;
    clonedMessage.message = message.message;
    clonedMessage.user = message.user;
    clonedMessage.room = message.room;
    return clonedMessage;
  }
}
