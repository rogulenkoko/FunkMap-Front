import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BandPreview, Band } from "./models";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { BaseResponse } from "app/tools";

@Injectable()
export abstract class BandService {

  constructor() { }

  abstract getBandPreview(login: string): Observable<BandPreview>;

  abstract getBand(login: string): Observable<Band>;

  abstract updateBand(band:Band): Observable<BaseResponse>;

}

@Injectable()
export class BandServiceHttp extends BandService {

  constructor(private http: HttpClient) {
    super();
   }

   getBandPreview(id: string): Observable<BandPreview>{
     return this.http.get(`${ConfigurationProvider.apiUrl}band/get/${id}`).map(res=>BandPreview.ToBandPreview(res.json()));
   }

   getBand(login: string): Observable<Band>{
     return this.http.get(`${ConfigurationProvider.apiUrl}band/getFull/${login}`).map(x=>Band.ToBand(x.json()));
   }

   updateBand(band:Band): Observable<BaseResponse>{
     return this.http.post(`${ConfigurationProvider.apiUrl}band/edit`, band).map(res=>BaseResponse.ToBaseResponse(res.json()));
   }

}
