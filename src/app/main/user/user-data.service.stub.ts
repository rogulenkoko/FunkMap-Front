import { Injectable } from '@angular/core';
import { UserDataService, UpdateImageResponse } from "./user-data.service";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools/models/base-response";
import { SaveImageRequest } from "./save-image-request";
import { SearchItem } from "app/main/search/search-item";
import { EntityType } from "app/main/map/models";
import { UserAvatarResponse } from "app/main/user/user-avatar-response";
import { UserResponse } from 'app/main/user/user';
import { ImageInfo } from 'app/main/search/image-info';

@Injectable()
export class UserDataServiceStub extends UserDataService {

  constructor() {
    super();
  }

  getImage(login: string): Observable<string> {
    return Observable.of(null);
  }

  saveImage(request: SaveImageRequest): Observable<UpdateImageResponse> {
    return Observable.of(new UpdateImageResponse(true, ""));
  }

  getUserEntities(): Observable<Array<SearchItem>> {
    var s1 = new SearchItem();
    s1.login = "test";
    s1.title = "Test Entity";
    s1.type = EntityType.Musician;
    return Observable.of([s1]);
  }

  getUserEntitiesLogins(): Observable<Array<string>> {
    return Observable.of(["test", "rogulenkoko"]);
  }

  getUser(login: string):Observable<UserResponse>{
    var response = new UserResponse();
    response.isExist = false;
    return Observable.of(response);
  }

  updateUserLocale(locale: string): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }
}
