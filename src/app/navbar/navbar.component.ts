import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from "../core/language/language.service";
import { UserService } from "../main/user/user.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isLogged: boolean = false;

  constructor(private languageService: LanguageService,
              private userService: UserService) { }

  ngOnInit() {
  }

  logOut(){
    console.log("test");
    this.userService.user = undefined;
  }

}
