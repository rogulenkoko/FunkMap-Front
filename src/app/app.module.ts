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
import { BandModule } from './main/band/band.module';
import { SearchModule } from "app/main/search/search.module";
import { FavouritesModule } from "app/main/favourites/favourites.module";
import { ShopModule } from "app/main/shop/shop.module";
import { StudioModule } from "app/main/studio/studio.module";
import { RehearsalModule } from "app/main/rehearsal/rehearsal.module";
import { MessengerModule } from "app/main/messenger/messenger.module";
import { StartComponent } from './start/start.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { AvatarModule } from "app/main/avatar/avatar.module";
import { VideoEditComponent } from './main/video-edit/video-edit.component';
import { VideoModule } from "app/main/video-edit/video.module";
import { NavbarModule } from "app/navbar/navbar.module";



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,

    SidebarComponent,

    StartComponent,

    MainWrapperComponent
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
    ShopModule,
    StudioModule,
    RehearsalModule,
    SearchModule,
    FavouritesModule,
    MessengerModule,
    AvatarModule,
    VideoModule,
    NavbarModule
  ],
  exports:[CoreModule, ToolsModule],
  providers: [
        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


