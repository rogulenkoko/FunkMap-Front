import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
 
import { AppComponent } from './app.component';

import { NavbarComponent } from './main/navbar/navbar.component';
import { CoreModule } from "app/core/core.module";
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from "./app.router";
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { ModalComponent } from './main/modal/modal.component';
import { LoginComponent } from './main/login/login.component';

import { LoginService, LoginServiceHttp } from "./main/login/login.service";
import { LoginServiceStub } from "./main/login/login.service.stub";
import { RegistrationComponent } from './main/registration/registration.component';

import { MapModule } from "./main/map/map.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    SidebarComponent,
    ModalComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    MapModule
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


