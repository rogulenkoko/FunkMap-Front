import { Injectable, EventEmitter } from '@angular/core';
import { Marker } from "app/main/map/models";

@Injectable()
export class MapFilter {

  public isAllShown: boolean;

  public onOutItemsSelected: EventEmitter<Marker>;

  constructor() {
    this.isAllShown = false;
    this.onOutItemsSelected = new EventEmitter<Marker>();
   }

}
