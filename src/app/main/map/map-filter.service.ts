import { Injectable, EventEmitter } from '@angular/core';
import { ProfileMarker } from "app/main/map/models";

@Injectable()
export class MapFilter {

  public isAllShown: boolean;

  public onOutItemsSelected: EventEmitter<ProfileMarker>;

  constructor() {
    this.isAllShown = false;
    this.onOutItemsSelected = new EventEmitter<ProfileMarker>();
   }

}
