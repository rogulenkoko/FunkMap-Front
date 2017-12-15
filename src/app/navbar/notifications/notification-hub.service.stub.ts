import { Injectable } from '@angular/core';
import { SignalrService } from 'app/tools/signalr/signalr.service';
import { SignalR, SignalRConnection, ISignalRConnection, IConnectionOptions, SignalRConfiguration } from "ng2-signalr";
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { UserService } from 'app/main/user/user.service';
import { Observable } from 'rxjs/Observable';
import { NotificationHubService } from 'app/navbar/notifications/notification-hub.service';


@Injectable()
export class NotificationHubServiceStub extends NotificationHubService {
  
  createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection> {
    return Observable.of(null);
  }

  configuration: SignalRConfiguration = null;


}
