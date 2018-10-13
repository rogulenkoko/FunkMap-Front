import { NgModule } from '@angular/core';
import { environment } from "environments/environment";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { CreationComponent } from "./creation.component";
import { CreationService, CreationServiceHttp } from "./creation.service";
import { CreationServiceStub } from "./creation.service.stub";
import { MapCreationComponent } from './map-creation/map-creation.component';

import { CanActivateCreation } from "./can-activate-creation";
import { EventsCreationComponent } from './events-creation/events-creation.component';
import { CalendarModule } from 'primeng/primeng';
import { EventsCreationService, EventsCreationServiceHttp, EventsCreationServiceStub } from './events-creation/events-creation.service';

@NgModule({
  declarations: [
    CreationComponent,
    MapCreationComponent,
    EventsCreationComponent,
  ],
  imports: [
    CoreModule,
    ToolsModule,
    CalendarModule
  ],
  exports: [
    CreationComponent,
    EventsCreationComponent
  ],
  providers: [
    {
      provide: CreationService,
      useClass: environment.useServer ? CreationServiceHttp : CreationServiceStub
    },
    {
      provide: EventsCreationService,
      useClass: environment.useServer ? EventsCreationServiceHttp : EventsCreationServiceStub
    },
    CanActivateCreation
  ]
})
export class CreationModule { }


