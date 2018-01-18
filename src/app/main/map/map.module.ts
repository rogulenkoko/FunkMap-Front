import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';


import { MapComponent } from './map.component';
import { MapProvider } from "./map-provider.service";
import { MarkerFactory } from "./marker-factory.service";
import { ToolsModule } from "app/tools/tools.module";

import { MapService, MapServiceHttp } from "./map.service";
import { MapServiceStub } from "./map.service.stub";
import { IconProvider } from "./icon-provider.service";
import { MapFilter } from "./map-filter.service";
import { MapCreationService } from "app/main/map/map-creation.service";
import { MapLegendComponent } from './map-legend/map-legend.component';
import { CoreModule } from "app/core/core.module";
import { SearchModule } from "app/main/search/search.module";

@NgModule({
  declarations: [
    MapComponent,
    MapLegendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToolsModule,
    CoreModule,
    SearchModule
  ],
  exports:[MapComponent],
  providers: [
    MapProvider,
    MarkerFactory,
    {
      provide: MapService,
      useClass: environment.production ? MapServiceHttp : MapServiceStub
    },
    IconProvider,
    MapFilter,
    MapCreationService
  ]
})
export class MapModule { }


