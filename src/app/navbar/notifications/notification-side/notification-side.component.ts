import { Component, OnInit } from '@angular/core';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { NotificationsInfoService } from 'app/navbar/notifications/notifications-info.service';
import { UserDataService } from 'app/main/user/user-data.service';

@Component({
  selector: 'app-notification-side',
  templateUrl: './notification-side.component.html',
  styleUrls: ['./notification-side.component.scss']
})
export class NotificationSideComponent implements OnInit {

  notifications: Array<FunkmapNotification> = [];

  constructor(private notificationService: NotificationService, 
              private notificationsInfoService: NotificationsInfoService,
              private userDataService: UserDataService) { }

  ngOnInit() {
    this.refreshNotification();
  }

  public refreshNotification(){
    this.notificationService.getNotifications().subscribe(notifications=>{
      this.notifications = notifications;
      this.getUsers();
      this.notificationsInfoService.newNotificationsCount = 0;
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

}
