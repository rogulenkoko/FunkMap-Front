import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BandPreview } from "./models";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class BandService {

  constructor() { }

  abstract getBand(login: string): Observable<BandPreview>;

}

@Injectable()
export class BandServiceHttp extends BandService {

  constructor(private http: HttpClient) {
    super();
   }

   getBand(id: string): Observable<BandPreview>{
     return this.http.get(`${ConfigurationProvider.apiUrl}band/get/${id}`).map(res=>BandPreview.ToBandPreview(res.json()));
   }

}
