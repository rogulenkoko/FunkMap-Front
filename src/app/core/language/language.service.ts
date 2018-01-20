import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";

@Injectable()
export class LanguageService {

  public language: string;

  public availableLanguages: Array<Language>;

  constructor(private translate: TranslateService){
    var ru = new Language("Language_Ru", "ru");
    var en = new Language("Language_En", "en");
    this.availableLanguages = [ru, en];

      var locale = this.availableLanguages.find(x=>window.navigator.language.includes(x.value));
      this.language = savedLanguage ? savedLanguage : (locale ? locale.value : this.availableLanguages[1].value);

    try {
      var savedLanguage = localStorage.getItem("language");
      
    } catch (ex) {
    }
    moment.locale(this.language);

    
    this.translate.addLangs(this.availableLanguages.map(x=>x.value));

    this.translate.setDefaultLang(this.language);
  }

  public changeLanguage(){
    this.translate.use(this.language);
    localStorage.setItem("language", this.language);
    moment.lang(this.language);
  }

}

export class Language{
  constructor(public title: string, public value: string){

  }
}
