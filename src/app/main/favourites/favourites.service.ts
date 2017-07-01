import { Injectable } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";

@Injectable()
export abstract class FavouritesService {

  constructor() { }

  abstract getFavourites(logins: Array<string>): Observable<Array<SearchItem>>;

  abstract setFavourite(login: string): Observable<BaseResponse>;

  abstract getFavouritesLogins(): Observable<Array<string>>;

}

@Injectable()
export class FavouritesServiceHttp extends FavouritesService {

  constructor(private http: HttpClient) {
    super();
  }

  getFavourites(logins: Array<string>): Observable<Array<SearchItem>> {
    return this.http.post(`${ConfigurationProvider.apiUrl}base/specific`,logins).map(x=>SearchItem.ToSearchItems(x.json()));
  }

  setFavourite(login: string): Observable<BaseResponse> {
    return this.http.get(`${ConfigurationProvider.apiUrl}favourites/setfavourite/${login}`).map(x=>BaseResponse.ToBaseResponse(x.json()));
  }
  getFavouritesLogins(): Observable<string[]> {
    return this.http.get(`${ConfigurationProvider.apiUrl}favourites/logins`).map(x=>x.json());
  }

}
