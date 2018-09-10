import { Injectable } from '@angular/core';
import { MapService } from "./map.service";
import { Observable } from "rxjs/Observable";
import { Map, MapType, ProfileMarker, EntityType, NearestRequest } from "./models";
import { InstrumentType } from "../musician/models";
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "app/core";
import { EventMarker } from './models/event-marker';

@Injectable()
export class MapServiceStub extends MapService {

  private allMarkers: Array<ProfileMarker>;

  private allEventMarkers: Array<EventMarker>;

  constructor(http: Http, translateService: LanguageService) {
    super(http, translateService);

    var m1 = new ProfileMarker("test", 53.8987, 30.0686, EntityType.Musician);
    m1.instrument = InstrumentType.Drums;
    var m2 = new ProfileMarker("rogulenkoko", 53.941121, 30.3431, EntityType.Musician);
    m2.instrument = InstrumentType.Bass;

    var m3 = new ProfileMarker("qwerty", 60.016649, 30.286341, EntityType.Musician);
    m3.instrument = InstrumentType.Keyboard;
    var m4 = new ProfileMarker("rickross", 59.915621, 30.3831, EntityType.Musician);
    m4.instrument = InstrumentType.Guitar;

    var b1 = new ProfileMarker("beatles", 50.5, 30.5, EntityType.Band);
    var b2 = new ProfileMarker("rchp", 53.951014, 30.2708, EntityType.Band);
    var r1 = new ProfileMarker("rehearsal", 60.016649, 29.006341, EntityType.Shop);

    this.allMarkers = [m1, m2, b2, m3, m4, b1, r1];


    var e1 = new EventMarker("1", 50.5, 30.2);
    var e2 = new EventMarker("2", 60.5, 32.2);
    var e3 = new EventMarker("3", 70.5, 34.2);

    this.allEventMarkers = [e1, e2, e3];
  }

  getAll(): Observable<Array<ProfileMarker>> {

    return Observable.of(this.allMarkers);
  }

  getNearest(request: NearestRequest): Observable<Array<ProfileMarker>> {
    return Observable.of(this.allMarkers);
  }

  getSpecific(logins: Array<string>): Observable<Array<ProfileMarker>> {
    return Observable.of(this.allMarkers);
  }

  getFiltered(): Observable<Array<ProfileMarker>>{
    return Observable.of(this.allMarkers);
  }

  getFilteredEvents(): Observable<Array<EventMarker>>{
    return Observable.of(this.allEventMarkers);
  }


}

