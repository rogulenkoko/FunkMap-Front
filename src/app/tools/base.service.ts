import { Injectable } from '@angular/core';
import { HttpClient } from 'app/core/http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { SearchItem } from 'app/main/search/search-item';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { ImageInfo } from 'app/main/search/image-info';
import { BaseResponse } from 'app/tools';
import { FavoriteRequest } from 'app/tools/favourite-request';

@Injectable()
export abstract class BaseService {

  abstract getSpecific(logins: Array<string>): Observable<Array<SearchItem>>;

  abstract getEntityImage(id: string): Observable<string>;

  abstract getFavourites(): Observable<Array<SearchItem>>;

  abstract getFavouritesLogins(): Observable<Array<string>>;

  abstract setFavourite(login: string, isFavourite: boolean): Observable<BaseResponse>;

}

@Injectable()
export class BaseServiceHttp extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getSpecific(logins: Array<string>): Observable<Array<SearchItem>> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/specific`, logins).map(x => SearchItem.ToSearchItems(x.json()));
  }

  getEntityImage(id: string): Observable<string> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/getimage?id=${id}`,null).map(x => x.json());
  }

  getFavouritesLogins(): Observable<Array<string>>{
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/favoritesLogins`).map(x => x.json());
  }

  getFavourites(): Observable<Array<SearchItem>>{
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/favorites`).map(x =>SearchItem.ToSearchItems(x.json()));
  }

  setFavourite(login: string, isFavourite: boolean): Observable<BaseResponse>{
    var request = new FavoriteRequest(login, isFavourite);
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/updateFavorite`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }
}
