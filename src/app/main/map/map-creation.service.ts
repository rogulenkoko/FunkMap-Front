import { Injectable, EventEmitter } from '@angular/core';
import { ProfileMarker } from "app/main/map/models";

@Injectable()
export class MapCreationService {

  public marker: ProfileMarker;
  public address: string;


  public onSelectPosition: EventEmitter<ProfileMarker>;
  public onCancel: EventEmitter<any>;

  public onComplete: EventEmitter<ProfileMarker>;


  public backRoute: string;

  constructor() { 
     this.onSelectPosition = new EventEmitter<ProfileMarker>();
     this.onComplete = new EventEmitter<ProfileMarker>();
     this.onCancel = new EventEmitter();
  }

}
