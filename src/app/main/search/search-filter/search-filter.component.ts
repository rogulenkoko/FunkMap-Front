import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Dictionary } from "typescript-collections";
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";

import { SelectItem } from 'primeng/primeng';
import { EntityType } from "app/main/map/models";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";
import { StylesItem, InstrumentsItem, EntityItem, ExpirienceItem } from "app/tools/select";
import { IconProvider } from 'app/main/map/icon-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  private styles: Array<StylesItem>;
  private instruments: Array<InstrumentsItem>;
  private entities: Array<EntityItem>;
  private expiriences: Array<ExpirienceItem>;

  private allTitle: string;

  private isTypeSelectionMode: boolean = false;
  private isFilerActive: boolean = false;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
    private searchFilterService: SearchFilterService,
    private entityTypeProvider: EntityTypeProvider,
    private translateService: TranslateService,
    private iconProvider: IconProvider,
    private router: Router) {

    
  }

  ngOnInit() {
    this.updateTranslate();
    this.translateService.onLangChange.subscribe(()=>this.updateTranslate())
  }

  private updateTranslate(){
    this.styles = this.musicianTypesProvider.musicStyles.keys().map(x => new StylesItem(x, this.translateService.get(this.musicianTypesProvider.musicStyles.getValue(x))));
    this.instruments = this.musicianTypesProvider.instruments.keys().map(x => new InstrumentsItem(x, this.translateService.get(this.musicianTypesProvider.instruments.getValue(x))));
    this.entities = this.entityTypeProvider.entities.keys().map(x => new EntityItem(x, this.translateService.get(this.entityTypeProvider.entities.getValue(x))));
    this.expiriences = this.musicianTypesProvider.expiriences.keys().map(x => new ExpirienceItem(x, this.translateService.get(this.musicianTypesProvider.expiriences.getValue(x))));

    this.translateService.get("All").subscribe(value=> this.allTitle = value);
  }

  selectType(type: EntityType, needToNavigate: boolean){
    this.searchFilterService.selectedEntity = type;
    this.onChanged(needToNavigate);
  }

  onChanged(needToNavigate: boolean) {
    this.searchFilterService.isFilterClear = false;
    this.searchFilterService.onFilterChanged.emit();
    this.searchFilterService.cacheFilter();
    if(needToNavigate) this.router.navigate(["/search"])
  }

  changeFilerActive(){
   this.isFilerActive = !this.isFilerActive;
  }

  private changeTypeSelectionMode(forceClose: boolean){

    if(forceClose){
      this.isTypeSelectionMode = false;
    } else {
      this.isTypeSelectionMode = !this.isTypeSelectionMode;
    }
  }

}