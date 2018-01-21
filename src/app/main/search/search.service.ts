import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NearestRequest, EntityType } from "app/main/map/models";
import { SearchItem } from "app/main/search/search-item";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { MusicianService } from "app/main/musician/musician.service";
import { BandService } from "app/main/band/band.service";
import { ShopService } from "app/main/shop/shop.service";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { StudioService } from "app/main/studio/studio.service";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import { MusicianFilter } from "app/main/musician/models";
import { BaseFilter } from "app/main/search/search-filter/base-filter";
import { BandFilter } from "app/main/band/models/band-filter";
import { SearchResponse } from "app/main/search/search-response";
import { UserService } from 'app/main/user/user.service';
import { ImageInfo } from 'app/main/search/image-info';

@Injectable()
export abstract class SearchService {

  constructor() { }

  abstract getNearest(request: FullLocationRequest): Observable<Array<SearchItem>>;

  abstract getFiltered(skip: number, take: number): Observable<SearchResponse>;

}

@Injectable() 
export class SearchServiceHttp extends SearchService {

  constructor(private http: HttpClient,
              private musicianService: MusicianService,
              private bandService: BandService,
              private shopService: ShopService,
              private rehearsalService: RehearsalService,
              private studioService: StudioService,
              private searchFilterService: SearchFilterService,
              private userService: UserService) {
    super();
  }

  getNearest(request: FullLocationRequest): Observable<Array<SearchItem>> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/fullnearest`, request).map(x => SearchItem.ToSearchItems(x.json()));
  }

  getFiltered(skip: number, take: number): Observable<SearchResponse> {
    var filter = this.searchFilterService.buildFilter(skip, take);
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/filtered`, filter).map(x => SearchResponse.ToSearchResponse(x.json()));
  }

  
}
