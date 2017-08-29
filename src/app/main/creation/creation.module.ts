import { NgModule } from '@angular/core';
import { environment } from "environments/environment";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { CreationComponent } from "./creation.component";
import { CreationService, CreationServiceHttp } from "./creation.service";
import { CreationServiceStub } from "./creation.service.stub";
import { MapCreationComponent } from './map-creation/map-creation.component';

import { CanActivateCreation } from "./can-activate-creation";

@NgModule({
  declarations: [
    CreationComponent,
    MapCreationComponent,
  ],
  imports: [
    CoreModule,
    ToolsModule
  ], 
  exports:[
      CreationComponent,
            ],
  providers: [
      {
      provide: CreationService,
      useClass: environment.production ? CreationServiceHttp : CreationServiceStub
    },
    CanActivateCreation
  ]
})
export class CreationModule { }


