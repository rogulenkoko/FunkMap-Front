import { Injectable } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import 'rxjs/add/operator/switchMap';
@Injectable()
export abstract class FavouritesService {

  constructor() { }

  abstract getFavourites(): Observable<Array<SearchItem>>;

  abstract getFavouritesLogins(): Observable<Array<string>>;

  abstract setFavourite(login: string): Observable<BaseResponse>;

}

@Injectable()
export class FavouritesServiceHttp extends FavouritesService {

  constructor(private http: HttpClient) {
    super();
  }

  getFavourites(): Observable<Array<SearchItem>> {
    return this.http.get(`${ConfigurationProvider.apiUrl}favourites/logins`).switchMap(x=>{
      var logins = x.json();
      return this.http.post(`${ConfigurationProvider.apiUrl}base/specific`,logins).map(x=>SearchItem.ToSearchItems(x.json()));
    });
  }

  getFavouritesLogins(): Observable<Array<string>>{
    return this.http.get(`${ConfigurationProvider.apiUrl}favourites/logins`).map(x=>x.json());
  }

  setFavourite(login: string): Observable<BaseResponse> {
    return this.http.get(`${ConfigurationProvider.apiUrl}favourites/setfavourite/${login}`).map(x=>BaseResponse.ToBaseResponse(x.json()));
  }

}
