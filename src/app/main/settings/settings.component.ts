import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../map/map-provider.service";
import { Map } from "../map/models";
import { Language, LanguageService } from "app/core/language/language.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(private mapProvider: MapProvider,
              private languageService: LanguageService) { 
  }

  ngOnInit() {
  }

}
