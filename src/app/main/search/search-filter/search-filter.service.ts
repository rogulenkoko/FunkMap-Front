import { Injectable, EventEmitter } from '@angular/core';
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { Entity } from "app/tools/models/entity";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { Dictionary } from "typescript-collections";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';


@Injectable()
export class SearchFilterService {

  public searchText: string;

  public styles: Dictionary<MusicStyle, string>;
  public selectedStyles: Array<MusicStyle>;

  public instruments: Dictionary<InstrumentType, string>;
  public selectedInstruments: Array<InstrumentType>;

  public selectedEntity: Entity;

  public expiriences: Dictionary<ExpirienceType, string>;
  public selectedExpirience: ExpirienceType;

  public onFilterChanged: EventEmitter<any>;

  public isFilterEnabled: boolean = true;
  public availableEntities: Array<Entity>;

  public searchChanged: Subject<string>;

  constructor(private entityTypeProvider: EntityTypeProvider,
              private musicianTypesProvider: MusicianTypesProvider) {
    this.selectedStyles = [];
    this.selectedInstruments = [];
    this.onFilterChanged = new EventEmitter();
    this.searchChanged = new Subject<string>();

    this.fillDefaultValues();
    
  }

  fillDefaultValues(){
    var allEntity = [new Entity(0,"All")];
    this.availableEntities = allEntity.concat(this.entityTypeProvider.availableEntities);
    this.selectedEntity = this.availableEntities[0];

    this.styles = new Dictionary<MusicStyle, string>(); 
    this.musicianTypesProvider.musicStyles.keys().forEach(key => {
      this.styles.setValue(key, this.musicianTypesProvider.musicStyles.getValue(key));
    }); 

    this.instruments = new Dictionary<InstrumentType, string>(); 
    this.musicianTypesProvider.instruments.keys().forEach(key => {
      this.instruments.setValue(key, this.musicianTypesProvider.instruments.getValue(key));
    }); 

    this.expiriences = new Dictionary<ExpirienceType, string>(); 
    this.expiriences.setValue(0, "All");
    this.musicianTypesProvider.expiriences.keys().forEach(key => {
      this.expiriences.setValue(key, this.musicianTypesProvider.expiriences.getValue(key));
    }); 
  }


  public clearFilter(){
    this.selectedEntity = this.availableEntities[0];
    this.selectedStyles = [];
    this.selectedExpirience = this.expiriences.keys[0];
    this.selectedInstruments = [];
    this.fillDefaultValues();
  }
}
