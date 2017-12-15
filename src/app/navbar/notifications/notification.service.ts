import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';
import { HttpClient } from 'app/core/http/http-client.service';
import { ConfigurationProvider, BaseModel } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { NotificationsFactory } from 'app/navbar/notifications/notifications-factory';
import { NotificationResponse } from 'app/navbar/notifications/models/notification-response';
import { BaseResponse } from 'app/tools';
import { SignalrService } from 'app/tools/signalr/signalr.service';
import { BroadcastEventListener, ISignalRConnection } from 'ng2-signalr';
import { NotificationHubService } from 'app/navbar/notifications/notification-hub.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export abstract class NotificationService {

  constructor(protected signalrService: NotificationHubService) {
    this._onNotificationRecieved = new Subject<FunkmapNotification>(); 
    this.signalrService.connection.subscribe(connection=>this.subscribeEvents(connection));
  }

  private _onNotificationRecieved: Subject<FunkmapNotification>;
  
  public get onNotificationRecieved(): Observable<FunkmapNotification>{
    return this._onNotificationRecieved;
  }

  abstract getNotifications(): Observable<Array<FunkmapNotification>>;

  abstract sendNotificationResponse(request: NotificationResponse): Observable<BaseResponse>;

  abstract getNewNotificationsCount(): Observable<number>;

  private subscribeEvents(connection: ISignalRConnection){
    if(!connection) return;

    connection.listenFor("onNotificationRecieved").subscribe(message=>this._onNotificationRecieved.next(NotificationsFactory.BuildNotification(message)));
  }

}

@Injectable()
export class NotificationServiceHttp extends NotificationService {

  constructor(private http: HttpClient, signalrService: NotificationHubService) {
    super(signalrService);
    
  }

  getNotifications(): Observable<Array<FunkmapNotification>> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Notifications)}notifications/getNotifications`).map(x => NotificationsFactory.BuildNotifications(x.json()));
  }

  sendNotificationResponse(request: NotificationResponse): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Notifications)}notifications/answer`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  getNewNotificationsCount(): Observable<number> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Notifications)}notifications/getNewNotificationsCount`).map(x => x.json());
  }

}
