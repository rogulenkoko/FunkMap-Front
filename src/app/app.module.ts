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
import { NavbarModule } from "app/navbar/navbar.module";
import { AboutModule } from "app/main/about/about.module";
import { ResponsiveModule } from 'ng2-responsive';
import { MobileStubComponent } from './main/mobile-stub/mobile-stub.component'
import { SidebarService } from "app/main/sidebar/sidebar.service";
import { AdaptiveService } from "app/tools/adaptive.service";



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    StartComponent,
    MainWrapperComponent,
    MobileStubComponent
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
    NavbarModule,
    AboutModule,
    ResponsiveModule
  ],
  exports:[CoreModule, ToolsModule],
  providers: [
    SidebarService,
    AdaptiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


