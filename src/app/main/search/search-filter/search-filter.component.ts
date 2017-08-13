import { Component, OnInit } from '@angular/core';
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Dictionary } from "typescript-collections";
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";

import { SelectItem } from 'primeng/primeng';
import { EntityType } from "app/main/map/models";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  private currenSelectedStyle: MusicStyle;

  private currenSelectedInstrument: InstrumentType;

  private styles: Array<StylesItem>;
  private instruments: Array<InstrumentsItem>;
  private entities: Array<EntityItem>;
  private expiriences: Array<ExpirienceItem>;


  constructor(private musicianTypesProvider: MusicianTypesProvider,
    private searchFilterService: SearchFilterService,
    private entityTypeProvider: EntityTypeProvider,
    private translateService: TranslateService) {
    this.styles = musicianTypesProvider.musicStyles.keys().map(x => new StylesItem(x, this.translateService.get(musicianTypesProvider.musicStyles.getValue(x))));
    this.instruments = musicianTypesProvider.instruments.keys().map(x => new InstrumentsItem(x, this.translateService.get(musicianTypesProvider.instruments.getValue(x))));
    this.entities = entityTypeProvider.entities.keys().map(x => new EntityItem(x, this.translateService.get(entityTypeProvider.entities.getValue(x))));
    this.expiriences = musicianTypesProvider.expiriences.keys().map(x => new ExpirienceItem(x, this.translateService.get(musicianTypesProvider.expiriences.getValue(x))));
  }

  ngOnInit() {

  }

  onChanged() {
    this.searchFilterService.onFilterChanged.emit();
  }

}

export class TranslateSelectItem implements SelectItem {
  constructor(public value: any, label: string | Observable<string>) {
    if (typeof (label) === 'string') {
      this.label = label;
    } else {
      var obs = label as Observable<string>;
      obs.subscribe(text => {
        this.label = text;
      })
    }
  }

  public label: string;
}

export class StylesItem extends TranslateSelectItem {

  constructor(value: MusicStyle, label: string | Observable<string>) {
    super(value, label);
  }
}

export class InstrumentsItem extends TranslateSelectItem {

  constructor(value: InstrumentType, label: string | Observable<string>) {
    super(value, label);
  }

  public label: string;
}

export class EntityItem extends TranslateSelectItem {
  constructor(value: EntityType, label: string | Observable<string>) {
    super(value, label);
  }
}

export class ExpirienceItem extends TranslateSelectItem {
  constructor(value: ExpirienceType, label: string | Observable<string>) {
    super(value, label);
  }
}