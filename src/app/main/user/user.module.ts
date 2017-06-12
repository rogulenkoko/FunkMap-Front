import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { UserService } from "./user.service";
import { CoreModule } from "app/core/core.module";
import { UserDataService, UserDataServiceHttp } from "./user-data.service";
import { UserDataServiceStub } from "./user-data.service.stub";


@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule
  ],
  exports:[],
  providers: [
      UserService,
      {
      provide: UserDataService,
      useClass: environment.production ? UserDataServiceHttp : UserDataServiceStub
    }
  ]
})
export class UserModule { }


