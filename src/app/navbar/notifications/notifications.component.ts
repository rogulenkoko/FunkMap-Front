import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { NotificationResponse } from 'app/navbar/notifications/models/notification-response';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private notifications: Array<FunkmapNotification>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    
  }

  public refreshNotification(){
    this.notificationService.getNotifications().subscribe(notifications=>{
      this.notifications = notifications;
    });
  }

  private sendResponse(response: number, id: string){
    var notificationResponse = new NotificationResponse(response > 0, id);
    this.notificationService.sendNotificationResponse(notificationResponse).subscribe(resp=>{
      
    });
  }

}
