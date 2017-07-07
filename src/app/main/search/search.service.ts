import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NearestRequest, EntityType } from "app/main/map/models";
import { SearchItem } from "app/main/search/search-item";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { MusicianService } from "app/main/musician/musician.service";
import { BandService } from "app/main/band/band.service";
import { ShopService } from "app/main/shop/shop.service";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { StudioService } from "app/main/studio/studio.service";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import { MusicianFilter } from "app/main/musician/models";

@Injectable()
export abstract class SearchService {

  constructor() { }

  abstract getNearest(request: FullLocationRequest): Observable<Array<SearchItem>>;

  abstract getFiltered(): Observable<Array<SearchItem>>;

}

@Injectable()
export class SearchServiceHttp extends SearchService {

  constructor(private http: HttpClient,
              private musicianService: MusicianService,
              private bandService: BandService,
              private shopService: ShopService,
              private rehearsalService: RehearsalService,
              private studioService: StudioService,
              private searchFilterService: SearchFilterService) {
    super();
  }

  getNearest(request: FullLocationRequest): Observable<Array<SearchItem>> {
    return this.http.post(`${ConfigurationProvider.apiUrl}base/fullnearest`, request).map(x => SearchItem.ToSearchItems(x.json()));
  }

  getFiltered(): Observable<Array<SearchItem>> {
    switch (this.searchFilterService.selectedEntity.type) {
      case EntityType.Musician:
        var musicianFilter = new MusicianFilter();
        musicianFilter.instruments = this.searchFilterService.instruments;
        musicianFilter.expirience = this.searchFilterService.selectedExpirience;
        musicianFilter.styles = this.searchFilterService.styles;
        musicianFilter.searchText = this.searchFilterService.searchText;
        console.log(musicianFilter);
        return this.musicianService.getFiltered(musicianFilter);
    }
  }

}
