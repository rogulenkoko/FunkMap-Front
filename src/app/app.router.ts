import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./main/login/login.component";
import { RegistrationComponent } from "./main/registration/registration.component";

const appRoutes: Routes = [
  {
    path: "",
    children: [
        {path:"", component: MainComponent, children:[
            {path:"login",component: LoginComponent},
            {path: "signup", component: RegistrationComponent}
        ]}
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