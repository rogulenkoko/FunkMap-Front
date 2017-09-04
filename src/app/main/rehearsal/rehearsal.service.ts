import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { RehearsalPreview, Rehearsal } from "app/main/rehearsal/models/rehearsal-preview";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";
import { BaseResponse } from "app/tools";
import { ServiceType } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class RehearsalService {

  constructor() { }

  abstract getRehearsalPreview(login: string): Observable<RehearsalPreview>;
  abstract getRehearsal(login: string): Observable<Rehearsal>;
  abstract updateRehearsal(rehersal: Rehearsal): Observable<BaseResponse>;
}

@Injectable()
export class RehearsalServiceHttp extends RehearsalService {

  constructor(private http: HttpClient) {
    super();
  }

  getRehearsalPreview(login: string): Observable<RehearsalPreview> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}rehearsal/get/${login}`).map(x=>RehearsalPreview.ToRehearsalPreview(x.json()));
  }

  getRehearsal(login: string): Observable<Rehearsal>{
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}rehearsal/getFull/${login}`).map(x=>Rehearsal.ToRehearsal(x.json()));
  }

  updateRehearsal(rehersal: Rehearsal): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}rehearsal/edit`, rehersal).map(x=>BaseResponse.ToBaseResponse(x.json()));
  }

}