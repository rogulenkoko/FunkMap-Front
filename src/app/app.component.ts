import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ThemeService } from "app/tools/theme.service";
import { UserService } from "app/main/user/user.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private themeService: ThemeService, private userService: UserService, 
              private router: Router){
    if(!userService.user) this.router.navigate(['/start']);
  }
}
