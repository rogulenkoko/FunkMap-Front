import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { MusicianComponent } from "./musician.component";
import { MusicianService, MusicianServiceHttp } from "./musician.service";
import { MusicianServiceStub } from "./musician.service.stub";
import { MusicianTypesProvider } from "./musician-types-provider";

@NgModule({
  declarations: [
    MusicianComponent
  ],
  imports: [
    CoreModule
  ],
  exports:[MusicianComponent],
  providers: [
    {
      provide: MusicianService,
      useClass: environment.production ? MusicianServiceHttp : MusicianServiceStub
    },
    MusicianTypesProvider
  ]
})
export class MusicianModule { }


