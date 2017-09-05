import { Injectable } from '@angular/core';
import { SaveImageRequest } from "app/main/user/save-image-request";
import { BaseResponse } from "app/tools";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, BaseModel } from "app/core";
import { ServiceType } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class AvatarBaseService {

  abstract updateAvatar(request: BaseModel): Observable<BaseResponse>;

}

@Injectable()
export class AvatarBaseServiceHttp extends AvatarBaseService {

  constructor(private http: HttpClient) {
    super();
   }

   updateAvatar(request: BaseModel): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Auth)}base/update`, request).map(x=> BaseResponse.ToBaseResponse(x.json()))
   }

}
