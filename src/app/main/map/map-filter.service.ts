import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MapFilter {

  public isAllShown: boolean;
  public onSearchAll: EventEmitter<any>;

  constructor() {
    this.isAllShown = false;
    this.onSearchAll = new EventEmitter();
   }

}
