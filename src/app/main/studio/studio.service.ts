import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { StudioPreview, Studio } from "app/main/studio/models/studio-preview";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";
import { BaseResponse } from "app/tools";
import { ServiceType } from "app/core/configuration/configuration-provider";
import { EntityType } from "app/main/map/models";

@Injectable()
export abstract class StudioService {

  constructor() { }

  abstract getStudioPreview(login: string): Observable<StudioPreview>;
  abstract getStudio(login: string): Observable<Studio>;
  abstract updateStudio(studio: Studio): Observable<BaseResponse>;

}

@Injectable()
export class StudioServiceHttp extends StudioService {

  constructor(private http: HttpClient) {
    super();
  }

  getStudioPreview(login: string): Observable<StudioPreview> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/get/${login}`).map(x => StudioPreview.ToStudioPreview(x.json()));
  }

  getStudio(login: string): Observable<Studio> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/getFull/${login}`).map(x => Studio.ToStudio(x.json()));
  }

  updateStudio(studio: Studio): Observable<BaseResponse>{
    studio.entityType = EntityType.Studio;
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/update`, studio).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

}
