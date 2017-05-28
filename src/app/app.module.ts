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

import { LoginModule } from "./main/login/login.module"
import { MapModule } from "./main/map/map.module";
import { SettingsModule } from "./settings/settings.module";
import { MusicianModule } from './main/musician/musician.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    MainComponent,
    SidebarComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    MapModule,
    SettingsModule,
    LoginModule,
    MusicianModule
  ],
  exports:[CoreModule],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


