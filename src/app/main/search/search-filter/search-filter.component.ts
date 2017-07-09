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

  

  private currenSelectedStyle: MusicStyle;
  

  private currenSelectedInstrument: InstrumentType;
  

  

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private searchFilterService: SearchFilterService) {

  }

  ngOnInit() {
   
  }

  private onEntityChange(selectedEntity: Entity){
  }

  onStyleChanged(){
    this.searchFilterService.selectedStyles.push(this.currenSelectedStyle);
    this.searchFilterService.styles.remove(this.currenSelectedStyle);
    this.currenSelectedStyle = undefined;

    this.searchFilterService.onFilterChanged.emit();
  }

  removeStyle(musicianStyle:MusicStyle){
    this.searchFilterService.selectedStyles.splice(this.searchFilterService.selectedStyles.findIndex(x=> x == musicianStyle), 1);
    this.searchFilterService.styles.setValue(musicianStyle, this.musicianTypesProvider.musicStyles.getValue(musicianStyle));

    this.searchFilterService.onFilterChanged.emit();
  }

  onInstrumentChanged(){
    this.searchFilterService.selectedInstruments.push(this.currenSelectedInstrument);
    this.searchFilterService.instruments.remove(this.currenSelectedInstrument);
    this.currenSelectedInstrument = undefined;

    this.searchFilterService.onFilterChanged.emit();
  }

  removeInstrument(instrument:InstrumentType){
    this.searchFilterService.selectedInstruments.splice(this.searchFilterService.selectedInstruments.findIndex(x=> x == instrument), 1);
    this.searchFilterService.instruments.setValue(instrument, this.musicianTypesProvider.instruments.getValue(instrument));

    this.searchFilterService.onFilterChanged.emit();
  }

  onExpirienceChanged(){
    this.searchFilterService.onFilterChanged.emit();
  }

  onEntityChanged(){
    this.searchFilterService.onFilterChanged.emit();
  }

}
