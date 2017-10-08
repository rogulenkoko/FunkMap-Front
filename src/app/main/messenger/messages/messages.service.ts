import { Injectable } from '@angular/core';
import { Dictionary } from "typescript-collections";
import { User } from 'app/main/user/user';

@Injectable()
export class MessagesService {

  public usersAvatars: Dictionary<string, User>;

  constructor() {
    this.usersAvatars = new Dictionary<string, User>();

   }

}
