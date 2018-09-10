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

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("649991936405-7dg10pb9ea6o42fncbt6615jcqmtcu4p.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("211667802913192")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    RestorePasswordComponent
  ],
  imports: [
    CoreModule,
    ToolsModule,
    SocialLoginModule
  ],
  exports:[LoginComponent,
            RegistrationComponent],
  providers: [
    {
      provide: LoginService,
      useClass: environment.useServer ? LoginServiceHttp : LoginServiceStub
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class LoginModule { }




