import { Injectable } from '@angular/core';
import { HttpClient } from 'app/core/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { SearchItem } from 'app/main/search/search-item';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { ImageInfo } from 'app/main/search/image-info';

@Injectable()
export abstract class BaseService {

  abstract getSpecific(logins: Array<string>): Observable<Array<SearchItem>>;

  abstract getEntitiesImages(ids: Array<string>): Observable<Array<ImageInfo>>;

}

@Injectable()
export class BaseServiceHttp extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getSpecific(logins: Array<string>): Observable<Array<SearchItem>> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/specific`, logins).map(x => SearchItem.ToSearchItems(x.json()));
  }

  getEntitiesImages(ids: Array<string>): Observable<Array<ImageInfo>>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/images`, ids).map(x => ImageInfo.ToImageInfos(x.json()));
  }
}
