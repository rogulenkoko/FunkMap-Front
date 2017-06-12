import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from "../core/language/language.service";
import { UserService } from "../main/user/user.service";
import { UserDataService } from "../main/user/user-data.service";
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
              private mapFilter: MapFilter,
              private userDataService: UserDataService) {
        this.userService.onUserChanged.subscribe(()=>this.getAvatar());
               }

  ngOnInit() {
    this.getAvatar();
  }

  logOut(){
    this.userService.user = undefined;
    this.mapFilter.isAllShown;
    this.userService.avatar = undefined;
  }

  private getAvatar(){
    if(this.userService.user){
      this.userDataService.getImage(this.userService.user.login).subscribe(image=>{
        this.userService.avatar = image ? `data:image/png;base64,${image}` : undefined;
      })
    }
  }

  showAll(){
    this.mapFilter.isAllShown = !this.mapFilter.isAllShown;
    this.mapFilter.onSearchAll.emit();
  }

}
