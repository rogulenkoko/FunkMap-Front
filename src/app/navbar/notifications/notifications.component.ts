import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { NotificationResponse } from 'app/navbar/notifications/models/notification-response';
import { Dictionary } from 'typescript-collections';
import { UserDataService } from 'app/main/user/user-data.service';
import { NotificationsInfoService } from 'app/navbar/notifications/notifications-info.service';
import { Subscription } from 'rxjs/Subscription';
import { SignalrService } from 'app/tools/signalr/signalr.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private userAvatars: Dictionary<string, string>;

  private notifications: Array<FunkmapNotification>;

  private subscription: Subscription;

  constructor(private notificationService: NotificationService,
            private userDataService: UserDataService,
            private notificationsInfoService: NotificationsInfoService,
            private signalrService: SignalrService) {
    this.userAvatars = new Dictionary<string,string>();

    this.subscription = new Subscription();
    this.signalrService.onNotificationConnectionStart.subscribe(() => this.initializeSubscriptions());
   }

  ngOnInit() {
    this.refreshAvatars();
  }

  public refreshNotification(){
    this.notificationService.getNotifications().subscribe(notifications=>{
      this.notifications = notifications;
      this.getAvatars();
      this.notificationsInfoService.newNotificationsCount = 0;
    });
  }

  private refreshAvatars(){
    if(!this.notifications) return;
    this.notifications.forEach(notification => {
      notification.userAvatar = this.userAvatars.getValue(notification.userLogin);
    });
  }

  private getAvatars(){
    var logins = this.notifications.map(x=>x.userLogin);
    var newLogins = logins.filter(x=> !this.userAvatars.keys().find(login=> login == x)).filter(x=> x != null);
    if(!newLogins || newLogins.length == 0){
      this.refreshAvatars();
      return;
    };
    this.userDataService.getImages(newLogins).subscribe(avatars=>{
      if(!avatars) return;
      avatars.forEach(element => {
        this.userAvatars.setValue(element.login, element.image);
      });
      this.refreshAvatars();
    });
  }

  private sendResponse(response: number, id: string){
    var notificationResponse = new NotificationResponse(response > 0, id);
    this.notificationService.sendNotificationResponse(notificationResponse).subscribe(resp=>{
      if(resp.success){
        var notification = this.notifications.find(x=>x.id == id);
        notification.isConfirmed = true;
      }
    });
  }

  private initializeSubscriptions(){
    this.notificationService.onNotificationRecieved.subscribe(notification=>{
      this.notifications.push(notification);
      this.getAvatars();

    });
  }

}
