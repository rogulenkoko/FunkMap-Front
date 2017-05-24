import { NgModule } from '@angular/core';
import { LanguageService } from "./index";
import { TranslateModule, TranslateLoader, TranslatePipe } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http } from '@angular/http';

@NgModule({
  declarations: [
  ],
  imports: [
  TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [Http]
      }
    })
  ],
  exports:[TranslateModule],
  providers: [
    LanguageService,
    {
      provide: TranslatePipe,
      useValue: TranslatePipe,
      multi: true
    }
  ]
})
export class CoreModule { }

export function translateLoader(http: Http) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}