import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { StudioComponent } from "app/main/studio/studio.component";
import { StudioService, StudioServiceHttp } from "app/main/studio/studio.service";
import { StudioServiceStub } from "app/main/studio/studio.service.stub";
import { environment } from "environments/environment";
import { SearchStudioComponent } from './search-studio/search-studio.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [StudioComponent, SearchStudioComponent],
  exports: [StudioComponent, SearchStudioComponent],
  providers: [
    {
      provide: StudioService,
      useClass: environment.production ? StudioServiceHttp : StudioServiceStub
    }
  ]
})
export class StudioModule { }
