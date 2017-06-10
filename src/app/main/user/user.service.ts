import { Injectable, EventEmitter } from '@angular/core';
import { User } from "./user"; 

@Injectable()
export class UserService {

  private _user: User;

  public set user(user: User){
    this._user = user;
    this.onUserChanged.emit();
    console.log("asd");
  }

  public get user():User{
    return this._user;
  }

  public onUserChanged: EventEmitter<any>;

  constructor() {
    this.onUserChanged = new EventEmitter();
   }

}
