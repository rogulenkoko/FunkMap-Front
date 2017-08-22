import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LanguageService {

  public language: string;

  public availableLanguages: Array<Language>;

  constructor(private translate: TranslateService){
    var ru = new Language("Language_Ru", "ru");
    var en = new Language("Language_En", "en");
    this.availableLanguages = [ru, en];


    try {
      var savedLanguage = localStorage.getItem("language");
      this.language = savedLanguage ? savedLanguage : this.availableLanguages[0].value;
    } catch (ex) {
      this.language = this.availableLanguages[0].value;
    }

    
    this.translate.addLangs(this.availableLanguages.map(x=>x.value));

    this.translate.setDefaultLang(this.language);
  }

  public changeLanguage(){
    this.translate.use(this.language);
    localStorage.setItem("language", this.language);
  }

}

export class Language{
  constructor(public title: string, public value: string){

  }
}
