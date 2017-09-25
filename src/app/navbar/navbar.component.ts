import { Component, OnInit, ViewChild } from '@angular/core';
import { Language, LanguageService } from "../core/language/language.service";
import { UserService } from "../main/user/user.service";
import { UserDataService } from "../main/user/user-data.service";
import { MapFilter } from "../main/map/map-filter.service";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { Router } from "@angular/router";
import { AvatarService } from "app/main/avatar/avatar.service";
import { Subscription } from "rxjs/Subscription";
import { NotificationsComponent } from 'app/navbar/notifications/notifications.component';
import { NotificationService } from 'app/navbar/notifications/notification.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(NotificationsComponent) notificationsComponent: NotificationsComponent;

  private isLogged: boolean = false;

  private subscription: Subscription;

  private newNotificationsCount: number;

  constructor(private languageService: LanguageService,
              private userService: UserService,
              private mapFilter: MapFilter,
              private userDataService: UserDataService,
              private filterService: SearchFilterService, 
              private router: Router,
              private avatarService: AvatarService,
              private notificationService: NotificationService) {
    this.subscription = new Subscription();
    this.userService.onUserChanged.subscribe(() => this.getAvatar());
    this.userService.onUserChanged.subscribe(() => this.getNotificationsCount());
    this.avatarService.onClosed.subscribe(()=> this.onAvatarClosed());
  }

  ngOnInit() {
    this.getAvatar();
    
  }

  private getAvatar() {
    if (this.userService.user) {
      this.userDataService.getImage(this.userService.user.login).subscribe(image => {
        this.userService.avatar = image;
        
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

  private changeNotificationsVisibility(){
    this.notificationsComponent.refreshNotification();
  }

  private getNotificationsCount(){
    this.notificationService.getNewNotificationsCount().subscribe(count=>{
      console.log(count);
      this.newNotificationsCount = count;
    });
  }

}
