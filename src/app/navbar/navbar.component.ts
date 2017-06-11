import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from "../core/language/language.service";
import { UserService } from "../main/user/user.service";
import { MapFilter } from "../main/map/map-filter.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isLogged: boolean = false;

  constructor(private languageService: LanguageService,
              private userService: UserService,
              private mapFilter: MapFilter) { }

  ngOnInit() {
  }

  logOut(){
    this.userService.user = undefined;
    this.mapFilter.isAllShown
  }

  showAll(){
    this.mapFilter.isAllShown = !this.mapFilter.isAllShown;
    this.mapFilter.onSearchAll.emit();
  }

}
