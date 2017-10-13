import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BandPreview, Band } from "./models";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { BaseResponse } from "app/tools";
import { EntityType } from "app/main/map/models";
import { LeaveBandRequest } from 'app/main/band/models/leave-band-request';

@Injectable()
export abstract class BandService {

  constructor() { }

  abstract getBandPreview(login: string): Observable<BandPreview>;

  abstract getBand(login: string): Observable<Band>;

  abstract updateBand(band:Band): Observable<BaseResponse>;

  abstract removeMusician(request: LeaveBandRequest):Observable<BaseResponse>;

}

@Injectable()
export class BandServiceHttp extends BandService {

  constructor(private http: HttpClient) {
    super();
   }

   getBandPreview(id: string): Observable<BandPreview>{
     return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}band/get/${id}`).map(res=>BandPreview.ToBandPreview(res.json()));
   }

   getBand(login: string): Observable<Band>{
     return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}band/getFull/${login}`).map(x=>Band.ToBand(x.json()));
   }

   updateBand(band:Band): Observable<BaseResponse>{
     band.entityType = EntityType.Band;
     return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/update`, band).map(res=>BaseResponse.ToBaseResponse(res.json()));
   }

   removeMusician(request: LeaveBandRequest):Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}band/removeMusician`, request).map(res=>BaseResponse.ToBaseResponse(res.json()));
   }

}
