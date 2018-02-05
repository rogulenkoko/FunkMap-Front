import { Component, OnInit, Input } from '@angular/core';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { NotificationResponse } from 'app/navbar/notifications/models/notification-response';
import { NotificationService } from 'app/navbar/notifications/notification.service';

@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {


  @Input() notifications: Array<FunkmapNotification> = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    
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

}
