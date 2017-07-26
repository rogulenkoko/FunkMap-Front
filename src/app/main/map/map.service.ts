import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MapType, Marker, NearestRequest } from "./models";
import { Http } from "@angular/http";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { GoogleLocation } from "app/main/map/models/location";

@Injectable()
export abstract class MapService {

  constructor(protected http: Http) { }

  abstract getAll(): Observable<Array<Marker>>;

  abstract getNearest(request: NearestRequest): Observable<Array<Marker>>;

  abstract getSpecific(logins: Array<string>): Observable<Array<Marker>>;

  public getLocation(): Observable<GoogleLocation> {
    return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBAe2vqNwz-pbrU2cp1nCWiz1yOAozPfps", {}).map(x => {
      var location = x.json().location;
      return new GoogleLocation(location.lat, location.lng, x.json().accuracy);
    })
  }

  public getAddress():Observable<string>{
    //todo язык
    return this.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=50,30&sensor=true&language=ru-RU").map(x=>{
      return x.json().results[0].formatted_address;
    })
  }

}

@Injectable()
export class MapServiceHttp extends MapService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Observable<Array<Marker>> {
    return this.http.get(`${ConfigurationProvider.apiUrl}base/all`).map(x => Marker.ToMarkerArray(x.json()));
  }

  getNearest(request: NearestRequest): Observable<Array<Marker>> {
    return this.http.post(`${ConfigurationProvider.apiUrl}base/nearest`, request).map(x => Marker.ToMarkerArray(x.json()));
  }

  getSpecific(logins: Array<string>): Observable<Array<Marker>> {
    return this.http.post(`${ConfigurationProvider.apiUrl}base/specificmarkers`, logins).map(x => Marker.ToMarkerArray(x.json()));
  }



}



