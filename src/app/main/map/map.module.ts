import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MapService, MapServiceHttp } from "./map.service";
import { MapServiceStub } from "./map.service.stub";
import { MapComponent } from "./map.component";
import { YaCoreModule }  from 'angular2-yandex-maps';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
      MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    YaCoreModule,
    AgmCoreModule
  ],
  exports:[MapComponent],
  providers: [
    {
      provide: MapService,
      useClass: environment.production ? MapServiceHttp : MapServiceStub
    }
  ]
})
export class MapModule { }


