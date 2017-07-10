import { Injectable } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { NearestRequest, EntityType } from "app/main/map/models";
import { Observable } from "rxjs/Observable";
import { SearchItem } from "app/main/search/search-item";
import { InstrumentType, ExpirienceType } from "app/main/musician/models";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { SearchResponse } from "app/main/search/search-response";

@Injectable()
export class SearchServiceStub extends SearchService{

  constructor() {
    super();
   }

   getNearest(request: FullLocationRequest): Observable<Array<SearchItem>>{
     var items = this.getItems();
     return Observable.of(items);
   }

   getFiltered(skip: number, take: number): Observable<SearchResponse> {
    var response = new SearchResponse();
    response.items = this.getItems();
    return Observable.of(response);
  }

  private getItems():Array<SearchItem>{
    var s1 = new SearchItem();
     s1.login = "test";
     s1.title = "Константинопольский Иван";
     s1.type = EntityType.Musician;
     s1.instrument = InstrumentType.Guitar;
     s1.expirience = ExpirienceType.Advanced;

     var s2 = new SearchItem();
     s2.login = "rogul";
     s2.title = "Иванцов Олег";
     s2.type = EntityType.Musician;
     s2.instrument = InstrumentType.Drums;
     s2.isFavourite = true;
     s2.expirience = ExpirienceType.Begginer;
     return [s1,s2];
  }

}
