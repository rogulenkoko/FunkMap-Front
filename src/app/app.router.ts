import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./main/login/login.component";
import { RegistrationComponent } from "./main/login/registration/registration.component";
import { SettingsComponent } from "./main/settings/settings.component";
import { MusicianComponent } from "./main/musician/musician.component";
import { CreationComponent } from './main/creation/creation.component';
import { MapCreationComponent } from './main/creation/map-creation/map-creation.component';
import { CanActivateCreation } from "./main/creation/can-activate-creation";
import { BandComponent } from './main/band/band.component';
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
import { BandFullComponent } from "app/main/band/band-full/band-full.component";
import { ShopFullComponent } from "app/main/shop/shop-full/shop-full.component";
import { StudioFullComponent } from "app/main/studio/studio-full/studio-full.component";
import { RehearsalFullComponent } from "app/main/rehearsal/rehearsal-full/rehearsal-full.component";
import { CanActivateSearch } from "app/tools/can-activate-search";
import { RestorePasswordComponent } from "app/main/login/restore-password/restore-password.component";
import { AboutComponent } from "app/main/about/about.component";
import { NotificationSideComponent } from "app/navbar/notifications/notification-side/notification-side.component";
import { CanActivateAdaptive } from "app/tools/can-activate-adaptive";
import { PaymentsComponent } from "app/main/payments/payments.component";

const appRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "", component: MainWrapperComponent, children: [
          {
            path: "", component: MainComponent, canActivate: [CanActivateSearch], children: [
              { path: "login", component: LoginComponent },
              { path: "restore", component: RestorePasswordComponent },
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
              { path: "create", component: CreationComponent, canActivate: [CanActivateCreation] },
              { path: "checkmap", component: MapCreationComponent },
              { path: "search", component: SearchComponent },
              { path: "favorites", component: FavouritesComponent },
              { path: "notifications", component: NotificationSideComponent , canActivate: [CanActivateAdaptive]}
            ],
          },
          { path: "musicianPage", component: MusicianFullComponent },
          { path: "musicianPage/:id", component: MusicianFullComponent },
          { path: "bandPage", component: BandFullComponent },
          { path: "bandPage/:id", component: BandFullComponent },
          { path: "shopPage", component: ShopFullComponent },
          { path: "shopPage/:id", component: ShopFullComponent },
          { path: "studioPage/", component: StudioFullComponent },
          { path: "studioPage/:id", component: StudioFullComponent },
          { path: "rehearsalPage", component: RehearsalFullComponent },
          { path: "rehearsalPage/:id", component: RehearsalFullComponent },
          { path: "messenger", component: MessengerComponent },
          { path: "messenger/:login", component: MessengerComponent },
          { path: "about", component: AboutComponent },
          { path: "shop", loadChildren: "app/main/payments/payments.module#PaymentsModule" }
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