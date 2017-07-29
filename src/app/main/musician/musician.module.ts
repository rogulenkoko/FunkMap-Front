import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { MusicianComponent } from "./musician.component";
import { MusicianService, MusicianServiceHttp } from "./musician.service";
import { MusicianServiceStub } from "./musician.service.stub";
import { MusicianTypesProvider } from "./musician-types-provider";
import { ToolsModule } from "app/tools/tools.module";
import { SearchMusicianComponent } from "app/main/musician/search-musician/search-musician.component";
import { MusicianFullComponent } from './musician-full/musician-full.component';
import { MusicianBaseComponent } from './musician-full/musician-base/musician-base.component';
import { MusicianInfoComponent } from './musician-full/musician-info/musician-info.component';
import { MusicianMapComponent } from './musician-full/musician-map/musician-map.component';
import { MusicianVideoComponent } from './musician-full/musician-video/musician-video.component';

@NgModule({
  declarations: [
    MusicianComponent,
    SearchMusicianComponent,
    MusicianFullComponent,
    MusicianBaseComponent,
    MusicianInfoComponent,
    MusicianMapComponent,
    MusicianVideoComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[MusicianComponent, SearchMusicianComponent],
  providers: [
    {
      provide: MusicianService,
      useClass: environment.production ? MusicianServiceHttp : MusicianServiceStub
    },
    MusicianTypesProvider
  ]
})
export class MusicianModule { }


