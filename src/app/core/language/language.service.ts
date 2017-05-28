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
    this.language = this.availableLanguages[0];
    this.translate.addLangs(this.availableLanguages.map(x=>x.value));

    this.translate.setDefaultLang(this.language.value);
  }

  public changeLanguage(){
    this.translate.use(this.language.value);
  }

}

export class Language{
  constructor(public title: string, public value: string){

  }
}
