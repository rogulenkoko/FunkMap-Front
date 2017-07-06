import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { BandService, BandServiceHttp } from "./band.service";
import { BandServiceStub } from "./band.service.stub";
import { BandComponent } from "./band.component";
import { SearchBandComponent } from './search-band/search-band.component';

@NgModule({
  declarations: [
      BandComponent,
      SearchBandComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[BandComponent, SearchBandComponent],
  providers: [
    {
      provide: BandService,
      useClass: environment.production ? BandServiceHttp : BandServiceStub
    }
  ]
})
export class BandModule { }


