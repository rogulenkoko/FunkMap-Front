import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { UserService } from "./user.service";
import { CoreModule } from "app/core/core.module";
import { UserDataService, UserDataServiceHttp } from "./user-data.service";
import { UserDataServiceStub } from "./user-data.service.stub";
import { UserEntitiesComponent } from "app/main/user/user-entities/user-entities.component";
import { ToolsModule } from "app/tools/tools.module";
import { SearchModule } from "app/main/search/search.module";


@NgModule({
  declarations: [
    UserEntitiesComponent
  ],
  imports: [
    CoreModule,
    ToolsModule,
    SearchModule
  ],
  exports:[UserEntitiesComponent],
  providers: [
      UserService,
      {
        provide: UserDataService,
        useClass: environment.production ? UserDataServiceHttp : UserDataServiceStub
      }
  ]
})
export class UserModule { }


