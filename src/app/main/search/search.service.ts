import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NearestRequest } from "app/main/map/models";
import { SearchItem } from "app/main/search/search-item";

@Injectable()
export abstract class SearchService {

  constructor() { }

  abstract getNearest(request: NearestRequest): Observable<Array<SearchItem>>;

}

@Injectable()
export class SearchServiceHttp extends SearchService {

  constructor() {
    super();
   }

   getNearest(request: NearestRequest): Observable<Array<SearchItem>>{
     return;
   }

}
