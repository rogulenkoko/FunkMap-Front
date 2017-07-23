import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ThemeService } from "app/tools/theme.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private themeService: ThemeService){
  }
}
