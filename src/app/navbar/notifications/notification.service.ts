import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';

@Injectable()
export abstract class NotificationService {

  constructor() { }

  abstract getNotifications(): Observable<Array<FunkmapNotification>>;

}

@Injectable()
export class NotificationServiceHttp extends NotificationService {

  constructor() {
    super();
   }

   getNotifications(): Observable<Array<FunkmapNotification>>{
     return;
   }

}
