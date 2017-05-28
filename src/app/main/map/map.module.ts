import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { MapComponent } from './map.component';
import { MapProvider } from "./map-provider.service";
import { MarkerFactory } from "./marker-factory.service";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports:[MapComponent],
  providers: [
    MapProvider,
    MarkerFactory
  ]
})
export class MapModule { }


