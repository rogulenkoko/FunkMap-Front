import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { StudioComponent } from "app/main/studio/studio.component";
import { StudioService, StudioServiceHttp } from "app/main/studio/studio.service";
import { StudioServiceStub } from "app/main/studio/studio.service.stub";
import { environment } from "environments/environment";
import { SearchStudioComponent } from './search-studio/search-studio.component';
import { StudioFullComponent } from './studio-full/studio-full.component';
import { StudioBaseComponent } from './studio-full/studio-base/studio-base.component';
import { StudioMapComponent } from './studio-full/studio-map/studio-map.component';
import { StudioInfoComponent } from './studio-full/studio-info/studio-info.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [StudioComponent, SearchStudioComponent, StudioFullComponent, StudioBaseComponent, StudioMapComponent, StudioInfoComponent],
  exports: [StudioComponent, SearchStudioComponent],
  providers: [
    {
      provide: StudioService,
      useClass: environment.useServer ? StudioServiceHttp : StudioServiceStub
    }
  ]
})
export class StudioModule { }
