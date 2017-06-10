import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { BandService, BandServiceHttp } from "./band.service";
import { BandServiceStub } from "./band.service.stub";
import { BandComponent } from "./band.component";

@NgModule({
  declarations: [
      BandComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[BandComponent],
  providers: [
    {
      provide: BandService,
      useClass: environment.production ? BandServiceHttp : BandServiceStub
    }
  ]
})
export class BandModule { }


