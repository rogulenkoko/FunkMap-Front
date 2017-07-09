import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MapType, Marker,NearestRequest } from "./models";
import { Http } from "@angular/http";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class MapService {

  constructor() { }

  abstract getAll(): Observable<Array<Marker>>;

  abstract getNearest(request: NearestRequest):Observable<Array<Marker>>;

  abstract getSpecific(logins: Array<string>):Observable<Array<Marker>>;

}

@Injectable()
export class MapServiceHttp extends MapService {

  constructor(private http: Http) {
    super();
   }

   getAll(): Observable<Array<Marker>>{
     return this.http.get(`${ConfigurationProvider.apiUrl}base/all`).map(x=>Marker.ToMarkerArray(x.json()));
   }

   getNearest(request: NearestRequest):Observable<Array<Marker>>{
     return this.http.post(`${ConfigurationProvider.apiUrl}base/nearest`, request).map(x=>Marker.ToMarkerArray(x.json()));
   }

   getSpecific(logins: Array<string>):Observable<Array<Marker>>{
      return this.http.post(`${ConfigurationProvider.apiUrl}base/specificmarkers`, logins).map(x=>Marker.ToMarkerArray(x.json()));
   }

}



