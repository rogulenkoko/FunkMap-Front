import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "./user";
import { UserEntitiesCountInfo } from 'app/main/user/user-entities-count';
import { AuthResponse } from 'app/main/login/login-response';


@Injectable()
export class UserService {

  private funkMapUserKey: string = "funkmap_user";

  private _user: User;


  public latitude: number;
  public longitude: number;

  public entitiesCountInfo: Array<UserEntitiesCountInfo>;

  public set user(user: User) {
    this._user = user;
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

  public setAuthData(auth: AuthResponse, user?: User) {
    
    if(this._user){
      this._user.expiresDate = auth.expiresDate;
      this._user.refreshToken = auth.refreshToken;
      this._user.token = auth.token;
      this._user.expiresIn = auth.expiresIn;
      this._user.issuedDate = auth.issuedDate;
      this.user = this._user;
    } else if(user){
      user.expiresDate = auth.expiresDate;
      user.refreshToken = auth.refreshToken;
      user.token = auth.token;
      user.expiresIn = auth.expiresIn;
      user.issuedDate = auth.issuedDate;
      this.user = user;
    }
  }

  private lastMarkerKey: string = "last_marker";

  public setLastCoordinates(marker: L.LatLng) {
    var markerJson = JSON.stringify(marker);
    localStorage.setItem(this.lastMarkerKey, markerJson);
  }

  public getLastCoordinates(): L.LatLng {
    var markerJson = localStorage.getItem(this.lastMarkerKey);
    var marker = JSON.parse(markerJson) as L.LatLng;
    return marker;
  }


}
