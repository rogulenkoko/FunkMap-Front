import { environment } from "environments/environment";
import { LoginComponent } from "./login.component";
import { LoginService, LoginServiceHttp } from "./login.service";
import { LoginServiceStub } from "./login.service.stub";
import { NgModule } from '@angular/core';
import { RegistrationComponent } from "./registration/registration.component";
import { CoreModule } from "app/core/core.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CoreModule
  ],
  exports:[LoginComponent,
            RegistrationComponent],
  providers: [
    {
      provide: LoginService,
      useClass: environment.production ? LoginServiceHttp : LoginServiceStub
    }
  ]
})
export class LoginModule { }


