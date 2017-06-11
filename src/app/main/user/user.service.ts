import { Injectable, EventEmitter } from '@angular/core';
import { User } from "./user"; 

@Injectable()
export class UserService {

  private funkMapUserKey: string = "funkmap_user";

  private _user: User;
  public avatar: string;

  public set user(user: User){
    this._user = user;
    if(user && user.image){
      this.avatar = `data:image/png;base64,${user.image}`;
    }
    this.onUserChanged.emit();
    localStorage.setItem(this.funkMapUserKey,JSON.stringify(this._user));
  }

  public get user():User{
    return this._user;
  }

  public onUserChanged: EventEmitter<any>;

  constructor() {
    if(localStorage.getItem(this.funkMapUserKey) != undefined){
      try{
        this._user = JSON.parse(localStorage.getItem(this.funkMapUserKey));
        this.avatar =  `data:image/png;base64,${this._user.image}`;
      }
      catch(ex){
        this._user = undefined;
      }
    }
    this.onUserChanged = new EventEmitter();
   }

}
