import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { NotificationResponse } from 'app/navbar/notifications/models/notification-response';
import { Dictionary } from 'typescript-collections';
import { UserDataService } from 'app/main/user/user-data.service';
import { NotificationsInfoService } from 'app/navbar/notifications/notifications-info.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  private notifications: Array<FunkmapNotification> = [];

  private subscription: Subscription;

  constructor(private notificationService: NotificationService,
            private userDataService: UserDataService,
            private notificationsInfoService: NotificationsInfoService) {

    this.subscription = new Subscription();
    this.initializeSubscriptions();
   }

  ngOnInit() {
  }

  public refreshNotification(){
    this.notificationService.getNotifications().subscribe(notifications=>{
      this.notifications = notifications;
      this.getUsers();
      this.notificationsInfoService.newNotificationsCount = 0;
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

  private getUsers(){
    if(!this.notifications && this.notifications.length == 0) return;
    var distinctUsers = this.notifications.filter((value, index, self)=> self.indexOf(value) == index).map(x=>x.userLogin);
    distinctUsers.forEach(user => {
      this.userDataService.getUser(user).subscribe(userInfo=>{

        if(!userInfo.isExist) return;

        var notifications = this.notifications.filter(x=>x.userLogin == user);
        notifications.forEach(x=> x.userAvatar = userInfo.user.avatar);
      });
    });
  }

  private initializeSubscriptions(){
    this.subscription.add(this.notificationService.onNotificationRecieved.subscribe(notification=>{
      this.notifications.push(notification);

    }));
  }

}
