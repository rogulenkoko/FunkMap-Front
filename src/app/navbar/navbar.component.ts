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
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SidebarService } from 'app/main/sidebar/sidebar.service';
import { NavbarService } from 'app/navbar/navbar.service';
import { User } from 'app/main/user/user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild(NotificationsComponent) notificationsComponent: NotificationsComponent;

  private isLogged: boolean = false;

  private changeAvatarMode: boolean = false;
  private subscription: Subscription;

  private user: User;
  

  constructor(private languageService: LanguageService,
              public userService: UserService,
              private mapFilter: MapFilter,
              private userDataService: UserDataService,
              private filterService: SearchFilterService, 
              private router: Router,
              private notificationService: NotificationService,
              private notificationsInfoService: NotificationsInfoService,
              private sidebarService: SidebarService,
              private navbarService: NavbarService) {
    
    if(this.userService.user) this.getNotificationsCount();
    this.userService.onUserChanged.subscribe(() => {this.getNotificationsCount(); this.getUser()});
    
    this.subscription = new Subscription();
    this.initializeSubscriptions();
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
   
  }

  private getUser(){
    if(this.userService.user){
      this.userDataService.getUser(this.userService.user.login).subscribe(user=>{
        if(!user.isExist) return;
        console.log(user.user);
        this.user = user.user;
      });
    }
  }

  private changeUserAvatar(){
    this.router.navigate(["/"]);
    this.changeAvatarMode = true;
  }

  private onAvatarSaved(image: string){
    var request = new SaveImageRequest(this.userService.user.login, image);
    this.userDataService.saveImage(request).subscribe(response=>{
      if(response.success){
        this.userService.user.avatar = response.path;
        this.user.avatar = response.path;
        this.userService.user = this.userService.user;
      }
    })
  }

  private changeNotificationsVisibility(){
    if(this.notificationsComponent) this.notificationsComponent.refreshNotification();
  }

  private getNotificationsCount(){
    if(!this.userService.user) return;
    this.notificationService.getNewNotificationsCount().subscribe(count=>{
      this.notificationsInfoService.newNotificationsCount = count;
    });
  }

  private initializeSubscriptions(){
    this.subscription.add(this.notificationService.onNotificationRecieved.subscribe(notification=>{
      this.notificationsInfoService.newNotificationsCount ++;
    })); 
  }

  private logOut() {
    this.userService.user = undefined;
    this.router.navigate(["/"]);
  }

  private changeSidebarVisible(){
    this.sidebarService.sidebarVisible = !this.sidebarService.sidebarVisible;
  }

}
