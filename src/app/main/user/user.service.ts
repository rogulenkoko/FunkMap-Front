import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "./user";
import { UserEntitiesCountInfo } from 'app/main/user/user-entities-count';


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

  private lastMarkerKey: string = "last_marker";

  public setLastCoordinates(marker: L.LatLng){
    var markerJson = JSON.stringify(marker);
    localStorage.setItem(this.lastMarkerKey,markerJson);
  }

  public getLastCoordinates(): L.LatLng{
    var markerJson = localStorage.getItem(this.lastMarkerKey);
    var marker = JSON.parse(markerJson) as L.LatLng;
    return marker;
  }

 
}
