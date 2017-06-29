import { Injectable } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";

@Injectable()
export abstract class FavouritesService {

  constructor() { }

  abstract getFavourites(): Observable<Array<SearchItem>>;

  abstract setFavourite(login: string): Observable<BaseResponse>;

  abstract getFavouritesLogins(): Observable<Array<string>>;

}

@Injectable()
export class FavouritesServiceHttp extends FavouritesService {

  constructor() {
    super();
  }

  getFavourites(): Observable<Array<SearchItem>> {
    return
  }

  setFavourite(login: string): Observable<BaseResponse> {
    throw new Error("Method not implemented.");
  }
  getFavouritesLogins(): Observable<string[]> {
    throw new Error("Method not implemented.");
  }

}
