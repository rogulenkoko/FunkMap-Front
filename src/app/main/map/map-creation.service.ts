import { Injectable, EventEmitter } from '@angular/core';
import { Marker } from "app/main/map/models";

@Injectable()
export class MapCreationService {

  public marker: Marker;
  public address: string;


  public onSelectPosition: EventEmitter<Marker>;
  public onCancel: EventEmitter<any>;

  public onComplete: EventEmitter<Marker>;


  public backRoute: string;

  constructor() { 
     this.onSelectPosition = new EventEmitter<Marker>();
     this.onComplete = new EventEmitter<Marker>();
     this.onCancel = new EventEmitter();
  }

}
