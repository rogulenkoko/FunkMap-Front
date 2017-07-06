import { Injectable, EventEmitter } from '@angular/core';
import { Marker } from "app/main/map/models";

@Injectable()
export class MapFilter {

  public isAllShown: boolean;
  public onSearchAll: EventEmitter<any>;

  public onOutItemsSelected: EventEmitter<Marker>;

  constructor() {
    this.isAllShown = false;
    this.onSearchAll = new EventEmitter();
    this.onOutItemsSelected = new EventEmitter<Marker>();
   }

}
