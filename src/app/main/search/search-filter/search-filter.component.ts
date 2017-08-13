import { Component, OnInit } from '@angular/core';
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { Entity } from "app/tools/models/entity";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Dictionary } from "typescript-collections";
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";

import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  private currenSelectedStyle: MusicStyle;

  private currenSelectedInstrument: InstrumentType;

  private styles: Array<StylesItem>;
  private selectedStyles: Array<MusicStyle> = [];

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private searchFilterService: SearchFilterService) {
      this.styles = musicianTypesProvider.musicStyles.keys().map(x=> new StylesItem(x, musicianTypesProvider.musicStyles.getValue(x)));
  }

  ngOnInit() {
   
  }

  private onEntityChange(selectedEntity: Entity){
  }

  onStyleChanged(){
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


export class StylesItem implements SelectItem {

  constructor(public value: MusicStyle, public label: string){

  }
}
