import { Injectable } from '@angular/core';
import { MapService } from "./map.service";
import { Observable } from "rxjs/Observable";
import { Map, MapType, Marker, EntityType } from "./models";

@Injectable()
export class MapServiceStub extends MapService {

  constructor() {
    super();
  }

  getAll(): Observable<Array<Marker>> {
    var m1 = new Marker(1, 50, 30, EntityType.Musician);
    var m2 = new Marker(2, 50, 31, EntityType.Musician);
    return Observable.of([m1, m2]);
  }

}

