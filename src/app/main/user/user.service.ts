import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "./user";
import { SignalR, SignalRConnection, ISignalRConnection } from "ng2-signalr";

@Injectable()
export class UserService {

  private funkMapUserKey: string = "funkmap_user";

  private _user: User;
  public avatar: string;

  public latitude: number;
  public longitude: number;

  public set user(user: User) {
    this._user = user;
    this.onUserChanged.emit();
    localStorage.setItem(this.funkMapUserKey, JSON.stringify(this._user));
    this.createSignaRConnection();
  }

  public get user(): User {
    return this._user;
  }

  public onUserChanged: EventEmitter<any>;

  private connection: ISignalRConnection;

  constructor(private signalR: SignalR) {
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

  private createSignaRConnection() {
    if (this.user) {
      this.signalR.connect().then(connection => {
        this.connection = connection;
        this.connection.errors.subscribe(errors=>{
          this.connection.stop();
          console.log(errors);
        })
      }).catch(error => {
        console.log(error);
      });

    }
  }
}
