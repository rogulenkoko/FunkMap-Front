import { Injectable } from '@angular/core';
import { HttpClient } from 'app/core/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { SearchItem } from 'app/main/search/search-item';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { ImageInfo } from 'app/main/search/image-info';
import { BaseService } from 'app/tools/base.service';
import { BaseResponse } from 'app/tools';

@Injectable()
export class BaseServiceStub extends BaseService {

  constructor() {
    super();
  }

  getSpecific(logins: Array<string>): Observable<Array<SearchItem>> {
    return Observable.of([]);
  }

  getEntitiesImages(ids: Array<string>): Observable<Array<ImageInfo>>{
    return Observable.of([]);
  }

  getFavourites(): Observable<Array<SearchItem>>{
    return Observable.of([])
  }

  setFavourite(login: string, isFavourite: boolean): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }

  getFavouritesLogins(): Observable<Array<string>>{
    return Observable.of([]);
  }
}
