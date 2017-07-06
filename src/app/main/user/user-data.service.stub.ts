import { Injectable } from '@angular/core';
import { UserDataService } from "./user-data.service";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools/models/base-response";
import { SaveImageRequest } from "./save-image-request";
import { SearchItem } from "app/main/search/search-item";
import { EntityType } from "app/main/map/models";

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

   getUserEntities(): Observable<Array<SearchItem>>{
     var s1 = new SearchItem();
     s1.login = "test";
     s1.title = "Test Entity";
     s1.type = EntityType.Musician;
    return Observable.of([s1]);
  }
}
