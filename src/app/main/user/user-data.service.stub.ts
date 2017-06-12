import { Injectable } from '@angular/core';
import { UserDataService } from "./user-data.service";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools/models/base-response";
import { SaveImageRequest } from "./save-image-request";

@Injectable()
export class UserDataServiceStub extends UserDataService {

  constructor() {
    super();
   }

   getImage(login: string): Observable<string>{
     return Observable.of(null);
   }

   saveImage(request: SaveImageRequest): Observable<BaseResponse>{
     return Observable.of(new BaseResponse(true));
   }


}
