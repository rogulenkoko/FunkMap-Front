import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { BaseResponse } from "app/tools/models/base-response";
import { SaveImageRequest } from "./save-image-request";
import { HttpClient } from "app/core/http/http-client.service";
import { SearchItem } from "app/main/search/search-item";


@Injectable()
export abstract class UserDataService {

  constructor() { }

  abstract getImage(login: string): Observable<string>;

  abstract saveImage(request: SaveImageRequest): Observable<BaseResponse>;

  abstract getUserEntities(): Observable<Array<SearchItem>>;

  abstract getUserEntitiesLogins(): Observable<Array<string>>;

}

@Injectable()
export class UserDataServiceHttp extends UserDataService {

  constructor(private http: HttpClient) {
    super();
  }

  getImage(login: string): Observable<string> {
    return this.http.get(`${ConfigurationProvider.apiUrl}user/avatar/${login}`).map(x => x.json());
  }

  saveImage(request: SaveImageRequest): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl}user/saveAvatar`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  getUserEntities(): Observable<Array<SearchItem>>{
    return this.http.get(`${ConfigurationProvider.apiUrl}base/users`).switchMap(x=>{
      var logins = x.json();
      return this.http.post(`${ConfigurationProvider.apiUrl}base/specific`,logins).map(x=>SearchItem.ToSearchItems(x.json()));
    });
  }

  getUserEntitiesLogins(): Observable<Array<string>>{
    return this.http.get(`${ConfigurationProvider.apiUrl}base/users`).map(x=>x.json());
  }

}
