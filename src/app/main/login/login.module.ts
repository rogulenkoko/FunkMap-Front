import { environment } from "environments/environment";
import { LoginComponent } from "./login.component";
import { LoginService, LoginServiceHttp } from "./login.service";
import { LoginServiceStub } from "./login.service.stub";
import { NgModule } from '@angular/core';
import { RegistrationComponent } from "./registration/registration.component";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { RestorePasswordComponent } from './restore-password/restore-password.component';

import { ConfigurationProvider } from "app/core";


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    RestorePasswordComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[LoginComponent,
            RegistrationComponent],
  providers: [
    {
      provide: LoginService,
      useClass: environment.useServer ? LoginServiceHttp : LoginServiceStub
    }
  ]
})
export class LoginModule { }




