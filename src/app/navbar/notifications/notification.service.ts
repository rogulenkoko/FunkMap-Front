import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { HttpClient } from 'app/core/http/http-client.service';
import { ConfigurationProvider, BaseModel } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { NotificationsFactory } from 'app/navbar/notifications/notifications-factory';
import { NotificationResponse } from 'app/navbar/notifications/models/notification-response';
import { BaseResponse } from 'app/tools';

@Injectable()
export abstract class NotificationService {

  constructor() { }

  abstract getNotifications(): Observable<Array<FunkmapNotification>>;

  abstract sendNotificationResponse(request: NotificationResponse): Observable<BaseResponse>;

  abstract getNewNotificationsCount():Observable<number>;

}

@Injectable()
export class NotificationServiceHttp extends NotificationService {

  constructor(private http: HttpClient) {
    super();
   }

   getNotifications(): Observable<Array<FunkmapNotification>>{
     return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Notifications)}notifications/getNotifications`).map(x=> NotificationsFactory.BuildNotifications(x.json()));
   }

   sendNotificationResponse(request: NotificationResponse): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Notifications)}notifications/answer`, request).map(x=> BaseResponse.ToBaseResponse(x.json()));
   }

   getNewNotificationsCount():Observable<number>{
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Notifications)}notifications/getNewNotificationsCount`).map(x=>x.json());
   }

}
