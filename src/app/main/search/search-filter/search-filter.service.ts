import { Injectable, EventEmitter } from '@angular/core';
import { MusicStyle, InstrumentType, ExpirienceType, MusicianFilter } from "app/main/musician/models";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { Dictionary } from "typescript-collections";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { EntityType } from "app/main/map/models";
import { BaseFilter } from 'app/main/search/search-filter/base-filter';
import { BandFilter } from 'app/main/band/models/band-filter';
import { UserService } from 'app/main/user/user.service';
import { ConfigurationProvider } from 'app/core';


@Injectable()
export class SearchFilterService {

  public searchTextStub: string; //используется только для сохранения текста в фильтре
  public searchText: string;

  public selectedStyles: Array<MusicStyle>;

  public selectedInstruments: Array<InstrumentType>;

  public selectedEntity: EntityType = 0;

  public expiriences: Dictionary<ExpirienceType, string>;
  public selectedExpiriences: Array<ExpirienceType> = [];

  public onFilterChanged: EventEmitter<any>;

  public isFilterEnabled: boolean = true;

  public searchChanged: Subject<string>;

  public isFilterClear: boolean = true;

  constructor(private entityTypeProvider: EntityTypeProvider,
              private musicianTypesProvider: MusicianTypesProvider,
              private userService: UserService) {
    this.selectedStyles = [];
    this.selectedInstruments = [];
    this.onFilterChanged = new EventEmitter();
    this.searchChanged = new Subject<string>();

    this.fillDefaultValues();
    this.parseCachedFilter();
    
  }

  fillDefaultValues(){

    this.expiriences = new Dictionary<ExpirienceType, string>(); 
    this.musicianTypesProvider.expiriences.keys().forEach(key => {
      this.expiriences.setValue(key, this.musicianTypesProvider.expiriences.getValue(key));
    }); 
  }

  private filterCacheKey: string = "filter";

  public cacheFilter(){
    var filter = this.buildFilter(0, 10);
    localStorage.setItem(this.filterCacheKey, JSON.stringify(filter));
  }

  private parseCachedFilter(){
    var filter: BaseFilter = JSON.parse(localStorage.getItem(this.filterCacheKey));
    if(!filter) return;

    this.isFilterEnabled = true;
    this.isFilterClear = false;

    this.selectedEntity = filter.entityType;
    switch (this.selectedEntity) {
      case EntityType.Musician:
        var musicianFilter = filter as MusicianFilter;
        this.selectedExpiriences = musicianFilter.expirience;
        this.selectedInstruments = musicianFilter.instruments;
        this.selectedStyles = musicianFilter.styles;
        break;
      case EntityType.Band:
      var bandFilter = filter as BandFilter;
        this.selectedStyles = bandFilter.styles;
        break;
    }
  }

  buildFilter(skip: number, take: number): any{
    var filter: any = {};
    switch (this.selectedEntity) {
      case EntityType.Musician:
        filter = new MusicianFilter(this.searchText, this.selectedEntity, skip, take);
        filter.instruments = this.selectedInstruments;
        filter.expirience = this.selectedExpiriences;
        filter.styles = this.selectedStyles;
        break;
      case EntityType.Band:
        filter = new BandFilter(this.searchText, this.selectedEntity, skip, take);
        filter.styles = this.selectedStyles;
        break;
      default:
        filter = new BaseFilter(this.searchText, this.selectedEntity, skip, take);
    }

    filter.longitude = this.userService.longitude;
    filter.latitude = this.userService.latitude;
    filter.limit = ConfigurationProvider.entitiesLimit;
    return filter;
  }


  public clearFilter(): boolean{

    if(this.isFilterClear){
      return false;
    }
    this.selectedEntity = 0;
    this.selectedStyles = [];
    this.selectedExpiriences = [];
    this.selectedInstruments = [];
    this.searchText = "";
    this.searchTextStub = "";
    this.fillDefaultValues();
    this.isFilterClear = true;
    this.cacheFilter();
    this.onFilterChanged.emit();
    return true;
  }
}
