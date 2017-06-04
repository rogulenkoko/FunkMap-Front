import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./main/login/login.component";
import { RegistrationComponent } from "./main/login/registration/registration.component";
import { SettingsComponent } from "./main/settings/settings.component";
import { MusicianComponent } from "./main/musician/musician.component";
import { CreationComponent } from './main/creation/creation.component';

const appRoutes: Routes = [
  {
    path: "",
    children: [
        {path:"", component: MainComponent, children:[
            {path:"login",component: LoginComponent},
            {path: "signup", component: RegistrationComponent},
            {path: "settings", component: SettingsComponent},
            {path: "musician", component: MusicianComponent},
            {path: "musician/:id", component: MusicianComponent}
            
        ]},
        {path: "create", component: CreationComponent},
        
    ]
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