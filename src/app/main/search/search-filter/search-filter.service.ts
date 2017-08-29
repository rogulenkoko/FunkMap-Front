import { Injectable, EventEmitter } from '@angular/core';
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { Dictionary } from "typescript-collections";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { EntityType } from "app/main/map/models";


@Injectable()
export class SearchFilterService {

  public searchTextStub: string; //используется только для сохранения текста в фильтре
  public searchText: string;

  public selectedStyles: Array<MusicStyle>;

  public selectedInstruments: Array<InstrumentType>;

  public selectedEntity: EntityType = 0;

  public expiriences: Dictionary<ExpirienceType, string>;
  public selectedExpiriences: Array<ExpirienceType>;

  public onFilterChanged: EventEmitter<any>;

  public isFilterEnabled: boolean = true;

  public searchChanged: Subject<string>;

  public isFilterClear: boolean = true;

  constructor(private entityTypeProvider: EntityTypeProvider,
              private musicianTypesProvider: MusicianTypesProvider) {
    this.selectedStyles = [];
    this.selectedInstruments = [];
    this.onFilterChanged = new EventEmitter();
    this.searchChanged = new Subject<string>();

    this.fillDefaultValues();
    
  }

  fillDefaultValues(){

    this.expiriences = new Dictionary<ExpirienceType, string>(); 
    this.musicianTypesProvider.expiriences.keys().forEach(key => {
      this.expiriences.setValue(key, this.musicianTypesProvider.expiriences.getValue(key));
    }); 
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
    return true;
  }
}
