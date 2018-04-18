import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { RehearsalPreview, Rehearsal } from "app/main/rehearsal/models/rehearsal-preview";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";
import { BaseResponse } from "app/tools";
import { ServiceType } from "app/core/configuration/configuration-provider";
import { EntityType } from "app/main/map/models";

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
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile-preview/${login}`).map(x=>RehearsalPreview.ToRehearsalPreview(x.json()));
  }

  getRehearsal(login: string): Observable<Rehearsal>{
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile/${login}`).map(x=>Rehearsal.ToRehearsal(x.json()));
  }

  updateRehearsal(rehersal: Rehearsal): Observable<BaseResponse>{
    rehersal.entityType = EntityType.RehearsalPoint;
    return this.http.put(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile`, rehersal).map(x=>BaseResponse.ToBaseResponse(x.json()));
  }

}