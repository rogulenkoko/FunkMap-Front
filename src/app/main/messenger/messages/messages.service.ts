import { Injectable } from '@angular/core';
import { Dictionary } from "typescript-collections";

@Injectable()
export class MessagesService {

  public usersAvatars: Dictionary<string, string>;

  constructor() {
    this.usersAvatars = new Dictionary<string, string>();
    this.usersAvatars.setValue("test", "asd");
    this.usersAvatars.setValue("test", "asdaaa");
   }

}
