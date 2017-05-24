import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LanguageService {

  public language: Language;

  public availableLanguages: Array<Language>;

  constructor(private translate: TranslateService){
    var ru = new Language("Russian", "ru");
    var en = new Language("English", "en");
    this.availableLanguages = [ru, en];
    this.translate.addLangs(this.availableLanguages.map(x=>x.value));

    this.translate.setDefaultLang("en");
  }

  public changeLanguage(lang: Language){
    this.translate.use(lang.value);
  }

}

export class Language{
  constructor(public title: string, public value: string){

  }
}
