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

import { SignalRModule, SignalRConfiguration } from '@dharapvj/ngx-signalr';
import { environment } from "environments/environment";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { MultiSelectModule, DropdownModule, TooltipModule, FileUploadModule, DialogModule, InputTextareaModule, SliderModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ResponsiveModule } from 'ng2-responsive';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';


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
    InputTextareaModule,
    FileUploadModule,
    BrowserAnimationsModule,
    DialogModule,
    SliderModule,
    MalihuScrollbarModule,
    ResponsiveModule,
    SwiperModule
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
    InputTextareaModule,
    FileUploadModule,
    BrowserAnimationsModule,
    DialogModule,
    SliderModule,
    MalihuScrollbarModule,
    ResponsiveModule,
    SwiperModule
  ],
  providers: [
    LanguageService,
    {
      provide: TranslatePipe,
      useValue: TranslatePipe,
      multi: true
    },
    HttpClient,
    ThemeService,
    MalihuScrollbarService
  ]
})
export class CoreModule { }

export function translateLoader(http: Http) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

export function createSignalRConfig() {
  var config = new SignalRConfiguration();
  return config;
}

