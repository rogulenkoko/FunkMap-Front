import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { StudioPreview, Studio } from "app/main/studio/models/studio-preview";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";
import { BaseResponse } from "app/tools";
import { ServiceType } from "app/core/configuration/configuration-provider";

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
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}studio/get/${login}`).map(x => StudioPreview.ToStudioPreview(x.json()));
  }

  getStudio(login: string): Observable<Studio> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}studio/getFull/${login}`).map(x => Studio.ToStudio(x.json()));
  }

  updateStudio(studio: Studio): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}studio/edit`, studio).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

}
