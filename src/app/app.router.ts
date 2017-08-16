import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./main/login/login.component";
import { RegistrationComponent } from "./main/login/registration/registration.component";
import { SettingsComponent } from "./main/settings/settings.component";
import { MusicianComponent } from "./main/musician/musician.component";
import { CreationComponent } from './main/creation/creation.component';
import { MapCreationComponent } from './main/creation/map-creation/map-creation.component';
import { MusicianCreationComponent } from './main/creation/musician-creation/musician-creation.component';
import { CanActivateCreation } from "./main/creation/can-activate-creation";
import { BandComponent } from './main/band/band.component';
import { AvatarComponent } from './main/avatar/avatar.component';
import { SearchComponent } from './main/search/search.component';
import { FavouritesComponent } from "app/main/favourites/favourites.component";
import { ShopComponent } from "app/main/shop/shop.component";
import { StudioComponent } from "app/main/studio/studio.component";
import { RehearsalComponent } from "app/main/rehearsal/rehearsal.component";
import { UserEntitiesComponent } from "app/main/user/user-entities/user-entities.component";
import { MusicianFullComponent } from "app/main/musician/musician-full/musician-full.component";
import { MessengerComponent } from "app/main/messenger/messenger.component";
import { StartComponent } from "app/start/start.component";
import { MainWrapperComponent } from "app/main-wrapper/main-wrapper.component";

const appRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "", component: MainWrapperComponent, children: [
          {
            path: "", component: MainComponent, children: [
              { path: "login", component: LoginComponent },
              { path: "signup", component: RegistrationComponent },
              { path: "settings", component: SettingsComponent },
              { path: "profile", component: UserEntitiesComponent },
              { path: "musician", component: MusicianComponent },
              { path: "musician/:id", component: MusicianComponent },
              { path: "band", component: BandComponent },
              { path: "band/:id", component: BandComponent },
              { path: "shop", component: ShopComponent },
              { path: "shop/:id", component: ShopComponent },
              { path: "studio", component: StudioComponent },
              { path: "studio/:id", component: StudioComponent },
              { path: "rehearsal", component: RehearsalComponent },
              { path: "rehearsal/:id", component: RehearsalComponent },
              { path: "avatar", component: AvatarComponent },
              { path: "create", component: CreationComponent, canActivate: [CanActivateCreation] },
              { path: "checkmap", component: MapCreationComponent },
              { path: "search", component: SearchComponent },
              { path: "favorites", component: FavouritesComponent }
            ],
          },
          { path: "musicianPage", component: MusicianFullComponent },
          { path: "musicianPage/:id", component: MusicianFullComponent },

          { path: "messenger", component: MessengerComponent },
        ]
      },
      { path: "start", component: StartComponent }
    ],

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }