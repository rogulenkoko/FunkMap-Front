import { Injectable } from '@angular/core';
import { FavouritesService } from "app/main/favourites/favourites.service";
import { Observable } from "rxjs/Observable";
import { SearchItem } from "app/main/search/search-item";
import { EntityType } from "app/main/map/models";
import { InstrumentType } from "app/main/musician/models";
import { BaseResponse } from "app/tools";

@Injectable()
export class FavouritesServiceStub extends FavouritesService {

  constructor() {
    super();
  }

  getFavourites(): Observable<Array<SearchItem>> {
    var s1 = new SearchItem();
    s1.login = "test";
    s1.title = "Константинопольский Иван";
    s1.type = EntityType.Musician;
    s1.instrument = InstrumentType.Guitar;

    var s2 = new SearchItem();
    s2.login = "rogul";
    s2.title = "Иванцов Олег";
    s2.type = EntityType.Musician;
    s2.instrument = InstrumentType.Drums;
    return Observable.of([s1, s2]);
  }

  setFavourite(login: string): Observable<BaseResponse> {
    return Observable.of(new BaseResponse(true));
  };

  getFavouritesLogins(): Observable<Array<string>> {
    return Observable.of(["test"]);
  };

}
