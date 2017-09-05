import { Injectable } from '@angular/core';
import { BaseResponse } from "app/tools";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { Observable } from "rxjs/Observable";
import { BaseModel } from "app/core";
import { BaseEditService } from "app/tools/entity-full/base-edit.service";


@Injectable()
export class BaseEditServiceStub extends BaseEditService {

  constructor() {
    super();
   }

   updateAvatar(request: BaseModel): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true))
   }

}
