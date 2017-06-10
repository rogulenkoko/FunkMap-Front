import { NgModule } from '@angular/core';
import { LanguageService } from "./index";
import { TranslateModule, TranslateLoader, TranslatePipe } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AuthRequestOptions } from "./options/auth-request-options"
import { UserService } from "app/main/user/user.service";
import { HttpClient } from "./http/http-client.service";


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [Http]
      }
    })
  ],
  exports: [
    TranslateModule, 
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule],
  providers: [
    LanguageService,
    {
      provide: TranslatePipe,
      useValue: TranslatePipe,
      multi: true
    },
    { provide: RequestOptions, 
      useClass: AuthRequestOptions, 
      deps:[UserService]
    },
    HttpClient
  ]
})
export class CoreModule { }

export function translateLoader(http: Http) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}