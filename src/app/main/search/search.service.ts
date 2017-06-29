import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NearestRequest } from "app/main/map/models";
import { SearchItem } from "app/main/search/search-item";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { FullLocationRequest } from "app/main/search/search-location-request";

@Injectable()
export abstract class SearchService {

  constructor() { }

  abstract getNearest(request: FullLocationRequest): Observable<Array<SearchItem>>;

}

@Injectable()
export class SearchServiceHttp extends SearchService {

  constructor(private http: HttpClient) {
    super();
   }

   getNearest(request: FullLocationRequest): Observable<Array<SearchItem>>{
     return this.http.post(`${ConfigurationProvider.apiUrl}base/fullnearest`, request).map(x=> SearchItem.ToSearchItems(x.json()));
   }

}
