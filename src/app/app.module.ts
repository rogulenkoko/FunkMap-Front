import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
 
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from "app/core/core.module";
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from "./app.router";
import { SidebarComponent } from './main/sidebar/sidebar.component';

import { LoginComponent } from './main/login/login.component';

import { LoginService, LoginServiceHttp } from "./main/login/login.service";
import { LoginServiceStub } from "./main/login/login.service.stub";
import { RegistrationComponent } from './main/registration/registration.component';

import { MapModule } from "./main/map/map.module";
import { SettingsModule } from "./settings/settings.module";
import { MusicianComponent } from './main/musician/musician.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    SidebarComponent,
    LoginComponent,
    RegistrationComponent,
    MusicianComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    MapModule,
    SettingsModule
  ],
  exports:[CoreModule],
  providers: [
    {
      provide: LoginService,
      useClass: environment.production ? LoginServiceHttp : LoginServiceStub
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


