import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from "../core/language/language.service";
import { UserService } from "../main/user/user.service";
import { UserDataService } from "../main/user/user-data.service";
import { MapFilter } from "../main/map/map-filter.service";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { Router } from "@angular/router";
import { AvatarService } from "app/main/avatar/avatar.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isLogged: boolean = false;

  private subscription: Subscription;

  constructor(private languageService: LanguageService,
              private userService: UserService,
              private mapFilter: MapFilter,
              private userDataService: UserDataService,
              private filterService: SearchFilterService, 
              private router: Router,
              private avatarService: AvatarService) {
    this.subscription = new Subscription();
    this.userService.onUserChanged.subscribe(() => this.getAvatar());
    this.avatarService.onClosed.subscribe(()=> this.onAvatarClosed());
  }

  ngOnInit() {
    this.getAvatar();
  }

  private getAvatar() {
    if (this.userService.user) {
      this.userDataService.getImage(this.userService.user.login).subscribe(image => {
        this.userService.avatar = image ? `data:image/png;base64,${image}` : undefined;
        
      })
    }
  }

  private changeUserAvatar(){
    this.avatarService.previousImage = this.userService.avatar;
    this.subscription = this.avatarService.onImageUploaded.subscribe(avatar=> this.onAvatarSaved(avatar));
    this.router.navigate(['/avatar']);
  }

  private onAvatarSaved(image: string){
    var request = new SaveImageRequest(this.userService.user.login, image);
    this.userDataService.saveImage(request).subscribe(response=>{
      if(response.success){
        this.getAvatar()
        this.router.navigate(["/"]);
      }
      this.avatarService.previousImage = undefined;
      this.subscription.unsubscribe();
    })
  }

  private onAvatarClosed(){
    if(this.subscription) this.subscription.unsubscribe();
  }

}
