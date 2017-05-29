import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../main/map/map-provider.service";
import { Map } from "../main/map/models";
import { Language, LanguageService } from "../core/language/language.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  constructor(private mapProvider: MapProvider,
              private languageService: LanguageService) { 
  }

  ngOnInit() {
  }

}
