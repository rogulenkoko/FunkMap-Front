import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from "app/main/favourites/favourites.component";
import { SearchModule } from "app/main/search/search.module";
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { environment } from "environments/environment";
import { FavouritesService, FavouritesServiceHttp } from "app/main/favourites/favourites.service";
import { FavouritesServiceStub } from "app/main/favourites/favourites.service.stub";

@NgModule({
  imports: [
    ToolsModule,
    SearchModule,
    CoreModule
  ],
  declarations: [FavouritesComponent],
  exports: [FavouritesComponent],
  providers:[
    {
      provide: FavouritesService,
      useClass: environment.production ? FavouritesServiceHttp : FavouritesServiceStub
    }
  ]
})
export class FavouritesModule { }
