import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { BandService, BandServiceHttp } from "./band.service";
import { BandServiceStub } from "./band.service.stub";
import { BandComponent } from "./band.component";
import { SearchBandComponent } from './search-band/search-band.component';
import { BandFullComponent } from './band-full/band-full.component';
import { BandBaseComponent } from './band-full/band-base/band-base.component';
import { BandInfoComponent } from './band-full/band-info/band-info.component';
import { BandMapComponent } from './band-full/band-map/band-map.component';
import { BandVideoComponent } from './band-full/band-video/band-video.component';
import { BandParticipantsComponent } from './band-full/band-participants/band-participants.component';

@NgModule({
  declarations: [
      BandComponent,
      SearchBandComponent,
      BandFullComponent,
      BandBaseComponent,
      BandInfoComponent,
      BandMapComponent,
      BandVideoComponent,
      BandParticipantsComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[BandComponent, SearchBandComponent, BandFullComponent],
  providers: [
    {
      provide: BandService,
      useClass: environment.production ? BandServiceHttp : BandServiceStub
    }
  ]
})
export class BandModule { }


