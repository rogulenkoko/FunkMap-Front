import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ToolsModule } from "app/tools/tools.module";
import { SearchService, SearchServiceHttp } from "./search.service";
import { SearchServiceStub } from "./search.service.stub";
import { environment } from "environments/environment";
import { CoreModule } from "app/core/core.module";
import { SearchListComponent } from './search-list/search-list.component';
import { MusicianModule } from "app/main/musician/musician.module";
import { BandModule } from "app/main/band/band.module";
import { ShopModule } from "app/main/shop/shop.module";
import { StudioModule } from "app/main/studio/studio.module";
import { RehearsalModule } from "app/main/rehearsal/rehearsal.module";

@NgModule({
  imports: [
    CommonModule,
    ToolsModule,
    CoreModule,
    MusicianModule,
    BandModule,
    ShopModule,
    StudioModule,
    RehearsalModule
  ],
  exports: [
    SearchComponent,
    SearchListComponent
  ],
  declarations: [SearchComponent, SearchListComponent],
  providers: [
     {
      provide: SearchService,
      useClass: environment.production ? SearchServiceHttp : SearchServiceStub
    }
  ]
})
export class SearchModule { }
