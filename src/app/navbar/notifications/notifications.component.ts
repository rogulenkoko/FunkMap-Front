import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private notifications: Array<FunkmapNotification>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.refreshNotification();
  }

  private refreshNotification(){
    this.notificationService.getNotifications().subscribe(notifications=>{
      this.notifications = notifications;
    });
  }

}
