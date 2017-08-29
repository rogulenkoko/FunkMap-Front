import { Injectable } from '@angular/core';
import { AvatarBaseService } from "app/main/avatar/avatar-base.service";
import { BaseResponse } from "app/tools";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AvatarBaseServiceStub extends AvatarBaseService {

  constructor() {
    super();
   }

   updateAvatar(request: SaveImageRequest): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true))
   }

}
