import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehearsalComponent } from './rehearsal.component';
import { RehearsalService, RehearsalServiceHttp } from "app/main/rehearsal/rehearsal.service";
import { RehearsalServiceStub } from "app/main/rehearsal/rehearsal.service.stub";
import { environment } from "environments/environment";
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { SearchRehearsalComponent } from './search-rehearsal/search-rehearsal.component';
import { RehearsalFullComponent } from './rehearsal-full/rehearsal-full.component';
import { RehearsalInfoComponent } from './rehearsal-full/rehearsal-info/rehearsal-info.component';
import { RehearsalMapComponent } from './rehearsal-full/rehearsal-map/rehearsal-map.component';
import { RehearsalBaseComponent } from './rehearsal-full/rehearsal-base/rehearsal-base.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [RehearsalComponent, SearchRehearsalComponent, RehearsalFullComponent, RehearsalInfoComponent, RehearsalMapComponent, RehearsalBaseComponent],
  exports: [RehearsalComponent, SearchRehearsalComponent],
  providers: [
    {
      provide: RehearsalService,
      useClass: environment.production ? RehearsalServiceHttp : RehearsalServiceStub
    }
  ]
})
export class RehearsalModule { }
