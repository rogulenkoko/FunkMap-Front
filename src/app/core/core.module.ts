import { NgModule } from '@angular/core';
import { LanguageService } from "./index";
import { TranslateModule, TranslateLoader, TranslatePipe } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { UserService } from "app/main/user/user.service";
import { HttpClient } from "./http/http-client.service";
import { ThemeService } from "app/tools/theme.service";
import { YoutubePlayerMiniModule } from "ng2-youtube-player-mini";

import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { environment } from "environments/environment";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { MultiSelectModule, DropdownModule, TooltipModule } from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    YoutubePlayerMiniModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [Http]
      }
    }),
    SignalRModule.forRoot(createSignalRConfig),
    MultiSelectModule,
    DropdownModule,
    TooltipModule,
    BrowserAnimationsModule,
  ],
  exports: [
    TranslateModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    YoutubePlayerMiniModule,
    RouterModule,
    MultiSelectModule,
    DropdownModule,
    TooltipModule,
    BrowserAnimationsModule
  ],
  providers: [
    LanguageService,
    {
      provide: TranslatePipe,
      useValue: TranslatePipe,
      multi: true
    },
    HttpClient,
    ThemeService
  ]
})
export class CoreModule { }

export function translateLoader(http: Http) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

export function createSignalRConfig() {
  var config = new SignalRConfiguration();
  config.hubName = "messenger";
  config.url = ConfigurationProvider.apiUrl.replace("/api/", "");
  config.qs = {};
  return config;
}