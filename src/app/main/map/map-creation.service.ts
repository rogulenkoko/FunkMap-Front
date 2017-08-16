import { Injectable, EventEmitter } from '@angular/core';
import { Marker } from "app/main/map/models";

@Injectable()
export class MapCreationService {

  public marker: Marker;

  public onSelectPosition: EventEmitter<Marker>;

  public onComplete: EventEmitter<Marker>;

  constructor() { 
     this.onSelectPosition = new EventEmitter<Marker>();
     this.onComplete = new EventEmitter<Marker>();
  }

}
