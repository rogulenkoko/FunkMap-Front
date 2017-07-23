import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LanguageService {

  public language: Language;

  public availableLanguages: Array<Language>;

  constructor(private translate: TranslateService){
    var ru = new Language("Language_Ru", "ru");
    var en = new Language("Language_En", "en");
    this.availableLanguages = [ru, en];


    try {
      var savedLanguage = JSON.parse(localStorage.getItem("language")) as Language;
      this.language = savedLanguage ? this.availableLanguages.find(x=>x.value == savedLanguage.value) : this.availableLanguages[0];
    } catch (ex) {
      this.language = this.availableLanguages[0];
    }

    
    this.translate.addLangs(this.availableLanguages.map(x=>x.value));

    this.translate.setDefaultLang(this.language.value);
  }

  public changeLanguage(){
    this.translate.use(this.language.value);
    localStorage.setItem("language", JSON.stringify(this.language));
  }

}

export class Language{
  constructor(public title: string, public value: string){

  }
}
