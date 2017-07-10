import { Injectable } from '@angular/core';
import { MapService } from "./map.service";
import { Observable } from "rxjs/Observable";
import { Map, MapType, Marker, EntityType, NearestRequest } from "./models";
import { InstrumentType } from "../musician/models";
import { Http } from "@angular/http";

@Injectable()
export class MapServiceStub extends MapService {

  private allMarkers: Array<Marker>;

  constructor(http: Http) {
    super(http);

    var m1 = new Marker("test", 53.8987, 30.0686, EntityType.Musician);
    m1.instrument = InstrumentType.Drums;
    var m2 = new Marker("rogulenkoko", 53.941121, 30.3431, EntityType.Musician);
    m2.instrument = InstrumentType.Bass;

    var m3 = new Marker("qwerty", 60.016649, 30.286341, EntityType.Musician);
    m3.instrument = InstrumentType.Keyboard;
    var m4 = new Marker("rickross", 59.915621, 30.3831, EntityType.Musician);
    m4.instrument = InstrumentType.Guitar;

    var b1 = new Marker("beatles", 50.5, 30.5, EntityType.Band);
    var b2 = new Marker("rchp", 53.951014, 30.2708, EntityType.Band);

    this.allMarkers = [m1, m2, b2, m3, m4, b1];
  }

  getAll(): Observable<Array<Marker>> {

    return Observable.of(this.allMarkers);
  }

  getNearest(request: NearestRequest): Observable<Array<Marker>> {
    return Observable.of(this.allMarkers.slice(0, 5));
  }

  getSpecific(logins: Array<string>): Observable<Array<Marker>> {
    return Observable.of(this.allMarkers.slice(0, 5));
  }

  getLocation(): Observable<Marker>{
     return ;
   }

}

