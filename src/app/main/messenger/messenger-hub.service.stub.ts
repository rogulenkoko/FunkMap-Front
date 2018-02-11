import { Injectable } from '@angular/core';
import { SignalrService } from 'app/tools/signalr/signalr.service';
import { SignalR, SignalRConnection, ISignalRConnection, IConnectionOptions, SignalRConfiguration } from "@dharapvj/ngx-signalr";
import { ConfigurationProvider } from 'app/core';
import { UserService } from 'app/main/user/user.service';
import { Observable } from 'rxjs/Observable';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { MessengerHubService } from 'app/main/messenger/messenger-hub.service';

@Injectable()
export class MessengerHubServiceStub extends MessengerHubService {

  createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection> {
    return Observable.of(null);
  }
  
  get configuration(): SignalRConfiguration{
    return null;
  };

  constructor() {
    super();
   }

}