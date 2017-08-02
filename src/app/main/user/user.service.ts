import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "./user";


@Injectable()
export class UserService {

  private funkMapUserKey: string = "funkmap_user";

  private _user: User;
  public avatar: string;

  public latitude: number;
  public longitude: number;

  public set user(user: User) {
    this._user = user;
    console.log("юзер засетился");
    this.onUserChanged.emit();
    localStorage.setItem(this.funkMapUserKey, JSON.stringify(this._user));
  }

  public get user(): User {
    return this._user;
  }

  public onUserChanged: EventEmitter<any>;

  

  constructor() {
    this.onUserChanged = new EventEmitter();

    if (localStorage.getItem(this.funkMapUserKey) != undefined) {
      try {
        this.user = JSON.parse(localStorage.getItem(this.funkMapUserKey));
      }
      catch (ex) {
        this.user = undefined;
      } finally {
        
      }
    }
  }

 
}
