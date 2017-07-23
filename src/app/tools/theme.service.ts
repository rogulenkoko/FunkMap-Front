import { Injectable } from '@angular/core';

declare var $: any;


@Injectable()
export class ThemeService {

  public themes: Array<Theme>;

  public selectedTheme: Theme;

  constructor() {
    this.themes = [
      new Theme("Theme_Light", "light"),
      new Theme("Theme_Dark", "dark")
    ];

    try{
      var savedTheme = JSON.parse(localStorage.getItem("theme")) as Theme;
      this.selectedTheme = savedTheme ? this.themes.find(x=>x.value == savedTheme.value) : this.themes[1];
    } catch(ex){
      this.selectedTheme = this.themes[1];
    } finally{
      this.changeTheme();
    }
    
  }

  public changeTheme(){
    $("body").removeClass();
    $("body").addClass(this.selectedTheme.value);
    localStorage.setItem("theme", JSON.stringify(this.selectedTheme));
  }

}


export class Theme {
  constructor(public title: string, public value: string) {

  }
}
