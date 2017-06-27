import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ToolsModule } from "app/tools/tools.module";
import { SearchService, SearchServiceHttp } from "./search.service";
import { SearchServiceStub } from "./search.service.stub";
import { environment } from "environments/environment";
import { SearchMusicianComponent } from "app/main/search/search-musician/search-musician.component";
import { CoreModule } from "app/core/core.module";

@NgModule({
  imports: [
    CommonModule,
    ToolsModule,
    CoreModule
  ],
  exports: [
    SearchComponent,
    SearchMusicianComponent
  ],
  declarations: [SearchComponent, SearchMusicianComponent],
  providers: [
     {
      provide: SearchService,
      useClass: environment.production ? SearchServiceHttp : SearchServiceStub
    }
  ]
})
export class SearchModule { }
