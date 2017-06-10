import { Injectable } from '@angular/core';
import { MapService } from "./map.service";
import { Observable } from "rxjs/Observable";
import { Map, MapType, Marker, EntityType } from "./models";
import { InstrumentType } from "../musician/models";

@Injectable()
export class MapServiceStub extends MapService {

  constructor() {
    super();
  }

  getAll(): Observable<Array<Marker>> {
    var m1 = new Marker(1, 50, 30, EntityType.Musician);
    m1.instrument = InstrumentType.Drums;
    var m2 = new Marker(2, 50, 31, EntityType.Musician);
    m2.instrument = InstrumentType.Bass;

    var b1 = new Marker(1,50.5, 30.5,EntityType.Band);
    return Observable.of([m1, m2, b1]);
  }

}

