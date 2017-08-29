import { Injectable } from '@angular/core';
import { SaveImageRequest } from "app/main/user/save-image-request";
import { BaseResponse } from "app/tools";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";

@Injectable()
export abstract class AvatarBaseService {

  abstract updateAvatar(request: SaveImageRequest): Observable<BaseResponse>;

}

@Injectable()
export class AvatarBaseServiceHttp extends AvatarBaseService {

  constructor(private http: HttpClient) {
    super();
   }

   updateAvatar(request: SaveImageRequest): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl}base/changeAvatar`, request).map(x=> BaseResponse.ToBaseResponse(x.json()))
   }

}
