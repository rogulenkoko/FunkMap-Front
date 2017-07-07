import { Component, OnInit } from '@angular/core';
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { Entity } from "app/tools/models/entity";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Dictionary } from "typescript-collections";
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  private availableEntities: Array<Entity>;

  private currenSelectedStyle: MusicStyle;
  private styles: Dictionary<MusicStyle, string>;

  private currenSelectedInstrument: InstrumentType;
  private instruments: Dictionary<InstrumentType, string>;

  

  constructor(private entityTypeProvider: EntityTypeProvider,
              private musicianTypesProvider: MusicianTypesProvider,
              private searchFilterService: SearchFilterService) {
    this.styles = new Dictionary<MusicStyle, string>(); 
    this.musicianTypesProvider.musicStyles.keys().forEach(key => {
      this.styles.setValue(key, this.musicianTypesProvider.musicStyles.getValue(key));
    }); 

    this.instruments = new Dictionary<InstrumentType, string>(); 
    this.musicianTypesProvider.instruments.keys().forEach(key => {
      this.instruments.setValue(key, this.musicianTypesProvider.instruments.getValue(key));
    }); 

    this.musicianTypesProvider.expiriences
  }

  ngOnInit() {
    var allEntity = [new Entity(0,"All")];
    this.availableEntities = allEntity.concat(this.entityTypeProvider.availableEntities);
    this.searchFilterService.selectedEntity = this.availableEntities[0];
  }

  private onEntityChange(selectedEntity: Entity){
  }

  onStyleChanged(){
    this.searchFilterService.styles.push(this.currenSelectedStyle);
    this.styles.remove(this.currenSelectedStyle);
    this.currenSelectedStyle = undefined;

    this.searchFilterService.onFilterChanged.emit();
  }

  removeStyle(musicianStyle:MusicStyle){
    this.searchFilterService.styles.splice(this.searchFilterService.styles.findIndex(x=> x == musicianStyle), 1);
    this.styles.setValue(musicianStyle, this.musicianTypesProvider.musicStyles.getValue(musicianStyle));
  }

  onInstrumentChanged(){
    this.searchFilterService.instruments.push(this.currenSelectedInstrument);
    this.instruments.remove(this.currenSelectedInstrument);
    this.currenSelectedInstrument = undefined;
  }

  removeInstrument(instrument:InstrumentType){
    this.searchFilterService.instruments.splice(this.searchFilterService.instruments.findIndex(x=> x == instrument), 1);
    this.instruments.setValue(instrument, this.musicianTypesProvider.instruments.getValue(instrument));
  }

}
