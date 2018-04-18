import { Injectable } from '@angular/core';
import { SaveImageRequest } from "app/main/user/save-image-request";
import { BaseResponse } from "app/tools";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, BaseModel } from "app/core";
import { ServiceType } from "app/core/configuration/configuration-provider";
import { ImageInfo } from 'app/main/search/image-info';

@Injectable()
export abstract class BaseEditService {

  abstract update(request: BaseModel): Observable<BaseResponse>;

  abstract delete(login: string): Observable<BaseResponse>;
  
  abstract getImages(ids: Array<string>): Observable<Array<ImageInfo>>;

  abstract updateAvatar(login: string, image: string): Observable<BaseResponse>;

}

@Injectable()
export class BaseEditServiceHttp extends BaseEditService {

  constructor(private http: HttpClient) {
    super();
  }

  update(request: BaseModel): Observable<BaseResponse> {
    return this.http.put(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}base/profile`, request).map(x => BaseResponse.ToBaseResponse(x.json()))
  }

  updateAvatar(login: string, image: string): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}base/avatar`,{Login: login, Photo: image}).map(x => BaseResponse.ToBaseResponse(x.json()))
  }

  delete(login: string): Observable<BaseResponse> {
    return this.http.delete(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}base/profile/${login}`).map(x => BaseResponse.ToBaseResponse(x.json()))
  }

  getImages(ids: Array<string>): Observable<Array<ImageInfo>>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/images`, ids).map(x => ImageInfo.ToImageInfos(x.json()));
  }
}
