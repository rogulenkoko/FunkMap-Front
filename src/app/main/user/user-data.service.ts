import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service"; 
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { BaseResponse } from "app/tools/models/base-response";
import { SaveImageRequest } from "./save-image-request";


@Injectable()
export abstract class UserDataService {

  constructor() { }

  abstract getImage(login: string): Observable<string>;

  abstract saveImage(request: SaveImageRequest): Observable<BaseResponse>;

}

@Injectable()
export class UserDataServiceHttp extends UserDataService {

  constructor(private http: Http) {
    super();
   }

   getImage(login: string): Observable<string>{
     return this.http.get(`${ConfigurationProvider.apiUrl}user/avatar/${login}`).map(x=>x.json());
   }

   saveImage(request: SaveImageRequest): Observable<BaseResponse>{
     return this.http.post(`${ConfigurationProvider.apiUrl}user/saveAvatar`, request).map(x=>BaseResponse.ToBaseResponse(x.json()));
   }

}
