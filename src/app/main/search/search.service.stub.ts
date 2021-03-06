import { Injectable } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { NearestRequest, EntityType } from "app/main/map/models";
import { Observable } from "rxjs/Observable";
import { SearchItem } from "app/main/search/search-item";
import { InstrumentType, ExpirienceType } from "app/main/musician/models";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { SearchResponse } from "app/main/search/search-response";
import { ImageInfo } from 'app/main/search/image-info';

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
    response.allCount = response.items.length;
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

     var s3 = new SearchItem();
     s3.login = "rogul2";
     s3.title = "The Beatles";
     s3.type = EntityType.Band;
     s3.isFavourite = true;

     var s4 = new SearchItem();
     s4.login = "rogul2";
     s4.title = "ShopTest";
     s4.type = EntityType.Shop;
     s4.isFavourite = true;

     var s5 = new SearchItem();
     s5.login = "rogul2";
     s5.title = "Studio";
     s5.type = EntityType.Studio;

    var s6 = new SearchItem();
     s6.login = "rogul2";
     s6.title = "Rehearsal Point";
     s6.type = EntityType.RehearsalPoint;

     return [s1,s2, s3, s4, s5, s6];
  }
}
