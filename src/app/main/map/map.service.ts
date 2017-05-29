import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MapType, MapMarker, Marker } from "./models";

@Injectable()
export abstract class MapService {

  constructor() { }

  abstract getAll(): Observable<Array<Marker>>;

}

@Injectable()
export class MapServiceHttp extends MapService {

  constructor() {
    super();
   }

   getAll(): Observable<Array<Marker>>{
     return;
   }

}



