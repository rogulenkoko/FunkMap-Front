import { Injectable } from '@angular/core';
import { HttpClient } from 'app/core/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { SearchItem } from 'app/main/search/search-item';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { ImageInfo } from 'app/main/search/image-info';
import { BaseService } from 'app/tools/base.service';

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
}
