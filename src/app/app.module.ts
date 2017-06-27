import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
 
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from "./app.router";
import { SidebarComponent } from './main/sidebar/sidebar.component';


import { LoginModule } from "./main/login/login.module"
import { MapModule } from "./main/map/map.module";
import { SettingsModule } from "./main/settings/settings.module";
import { MusicianModule } from './main/musician/musician.module';
import { UserModule } from "./main/user/user.module";
import { CreationModule } from './main/creation/creation.module';
import { AuthRequestOptions } from "app/core/options/auth-request-options";
import { BandModule } from './main/band/band.module';
import { AvatarComponent } from './main/avatar/avatar.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SearchModule } from "app/main/search/search.module";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    MainComponent,

    SidebarComponent,

    AvatarComponent
  ],
  imports: [
    CoreModule,
    ToolsModule,
    AppRoutingModule, 
    MapModule,
    SettingsModule,
    LoginModule,
    MusicianModule,
    UserModule,
    CreationModule,
    BandModule,
    SearchModule,
    ImageCropperModule
  ],
  exports:[CoreModule, ToolsModule],
  providers: [
        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


