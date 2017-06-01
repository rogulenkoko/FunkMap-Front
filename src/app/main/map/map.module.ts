import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';


import { MapComponent } from './map.component';
import { MapProvider } from "./map-provider.service";
import { MarkerFactory } from "./marker-factory.service";
import { ToolsModule } from "app/tools/tools.module";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToolsModule
  ],
  exports:[MapComponent],
  providers: [
    MapProvider,
    MarkerFactory
  ]
})
export class MapModule { }


