import { Injectable } from '@angular/core';
import { SaveImageRequest } from "app/main/user/save-image-request";
import { BaseResponse } from "app/tools";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, BaseModel } from "app/core";
import { ServiceType } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class BaseEditService {

  abstract update(request: BaseModel): Observable<BaseResponse>;

  abstract delete(login: string): Observable<BaseResponse>;

}

@Injectable()
export class BaseEditServiceHttp extends BaseEditService {

  constructor(private http: HttpClient) {
    super();
  }

  update(request: BaseModel): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}base/update`, request).map(x => BaseResponse.ToBaseResponse(x.json()))
  }

  delete(login: string): Observable<BaseResponse> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}base/delete${login}`).map(x => BaseResponse.ToBaseResponse(x.json()))
  }



}
