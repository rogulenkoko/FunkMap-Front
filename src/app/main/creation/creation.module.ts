import { NgModule } from '@angular/core';
import { environment } from "environments/environment";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { CreationComponent } from "./creation.component";
import { CreationService, CreationServiceHttp } from "./creation.service";
import { CreationServiceStub } from "./creation.service.stub";
import { MusicianCreationComponent } from "./musician-creation/musician-creation.component";
import { MapCreationComponent } from './map-creation/map-creation.component';

@NgModule({
  declarations: [
    CreationComponent,
    MusicianCreationComponent,
    MapCreationComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[
      CreationComponent,
      MusicianCreationComponent
            ],
  providers: [
      {
      provide: CreationService,
      useClass: environment.production ? CreationServiceHttp : CreationServiceStub
    },
    
  ]
})
export class CreationModule { }


