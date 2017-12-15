import { Injectable } from '@angular/core';
import { SignalrService } from 'app/tools/signalr/signalr.service';
import { SignalR, SignalRConnection, ISignalRConnection, IConnectionOptions, SignalRConfiguration } from "ng2-signalr";
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { UserService } from 'app/main/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class NotificationHubService extends SignalrService {

  constructor() {
    super();
  }

}

@Injectable()
export class NotificationHubServiceReal extends NotificationHubService {

  get configuration(): SignalRConfiguration {
    var connectionOptions = new SignalRConfiguration();
    connectionOptions.hubName = "notifications";
    connectionOptions.qs = {};
    connectionOptions.qs['login'] = this.userService.user ? this.userService.user.login : "";
    connectionOptions.url = ConfigurationProvider.apiUrl(ServiceType.Notifications).replace("/api/", "");
    return connectionOptions;
  }

  constructor(private signalR: SignalR,
    private userService: UserService) {
    super();
    this.userService.onUserChanged.subscribe(() =>{
      return this.createHubConnection(this.configuration);
    });
  }


  public createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection> {
    if(this._connection){
      this._connection.stop();
      this._connection = undefined;
    }
    this._connection = this.signalR.createConnection(config);
    return Observable.fromPromise(this._connection.start()).switchMap(connection => {
      this._connection.errors.subscribe(errors => {
        this._connection.stop();
      });

      return Observable.of(connection);

    }).catch(error => {
      console.log(error);
      return Observable.of(null);
    });
  }

}
