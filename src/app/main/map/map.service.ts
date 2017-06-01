import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MapType, Marker } from "./models";
import { Http } from "@angular/http";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class MapService {

  constructor() { }

  abstract getAll(): Observable<Array<Marker>>;

}

@Injectable()
export class MapServiceHttp extends MapService {

  constructor(private http: Http) {
    super();
   }

   getAll(): Observable<Array<Marker>>{
     return this.http.get(ConfigurationProvider.apiUrl + "search/all").map(x=>Marker.ToMarkerArray(x.json()));
   }

}



