import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../map/map-provider.service";
import { Map } from "../map/models";
import { Language, LanguageService } from "app/core/language/language.service";
import { ThemeService } from "app/tools/theme.service";
import { Observable } from "rxjs/Observable";
import { TranslateSelectItem } from "app/tools/select";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  private theme: string = "dark";
  private languages: Array<LanguageItem>;
  private maps: Array<MapItem>;

  constructor(private mapProvider: MapProvider,
              private languageService: LanguageService,
              private themeService: ThemeService,
              private translateService: TranslateService) { 
    
  }

  ngOnInit() {
    this.updateLanguages();
  }

  private updateLanguages(){
    this.languages = this.languageService.availableLanguages.map(x => new LanguageItem(x.value, this.translateService.get(x.title)));
    this.maps = this.mapProvider.maps.map(x => new MapItem(x, this.translateService.get(x.title)));
  }
}

export class LanguageItem extends TranslateSelectItem {
  constructor(value: string, label: string | Observable<string>) {
    super(value, label);
  }
}

export class MapItem extends TranslateSelectItem {
  constructor(value: Map, label: string | Observable<string>) {
    super(value, label);
  }
}
