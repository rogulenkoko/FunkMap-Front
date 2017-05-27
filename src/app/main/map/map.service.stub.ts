import { Injectable } from '@angular/core';
import { MapService } from "./map.service";
import { Observable } from "rxjs/Observable";
import { MapPoint, MapType, Marker } from "./models";

@Injectable()
export class MapServiceStub extends MapService {

  constructor() {
    super();
   }

   getAll(): Observable<Array<Marker>>{
     var m1 = new Marker(new MapPoint(50,30));
     var m2 = new Marker(new MapPoint(50,31));
     return Observable.of([m1, m2]);
   }

}

