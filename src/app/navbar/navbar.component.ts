import { Component, OnInit, ViewChild } from '@angular/core';
import { Language, LanguageService } from "../core/language/language.service";
import { UserService } from "../main/user/user.service";
import { UserDataService } from "../main/user/user-data.service";
import { MapFilter } from "../main/map/map-filter.service";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { NotificationsComponent } from 'app/navbar/notifications/notifications.component';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { NotificationsInfoService } from 'app/navbar/notifications/notifications-info.service';
import { SignalrService } from 'app/tools/signalr/signalr.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(NotificationsComponent) notificationsComponent: NotificationsComponent;

  private isLogged: boolean = false;

  private changeAvatarMode: boolean = false;
  

  constructor(private languageService: LanguageService,
              private userService: UserService,
              private mapFilter: MapFilter,
              private userDataService: UserDataService,
              private filterService: SearchFilterService, 
              private router: Router,
              private notificationService: NotificationService,
              private notificationsInfoService: NotificationsInfoService,
              private signalrService: SignalrService) {
    this.userService.onUserChanged.subscribe(() => this.getAvatar());

    if(this.userService.user) this.getNotificationsCount();
    this.userService.onUserChanged.subscribe(() => this.getNotificationsCount());
    

    this.signalrService.onNotificationConnectionStart.subscribe(() => this.initializeSubscriptions());
  }

  ngOnInit() {
    this.getAvatar();
    
  }

  private getAvatar() {
    if (this.userService.user) {
      this.userDataService.getImage(this.userService.user.login).subscribe(image => {
        this.userService.user.avatar = image;
        
      })
    }
  }

  private changeUserAvatar(){
    this.changeAvatarMode = true;
  }

  private onAvatarSaved(image: string){
    var request = new SaveImageRequest(this.userService.user.login, image);
    this.userDataService.saveImage(request).subscribe(response=>{
      if(response.success){
        this.userService.user.avatar = image;
      }
    })
  }

  private changeNotificationsVisibility(){
    this.notificationsComponent.refreshNotification();
  }

  private getNotificationsCount(){
    this.notificationService.getNewNotificationsCount().subscribe(count=>{
      this.notificationsInfoService.newNotificationsCount = count;
    });
  }

  private initializeSubscriptions(){
    this.notificationService.onNotificationRecieved.subscribe(notification=>{
      this.notificationsInfoService.newNotificationsCount ++;
    }); 
  }

  private logOut() {
    this.userService.user = undefined;
    this.router.navigate(["/"]);
  }

}
