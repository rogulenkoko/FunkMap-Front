import { Injectable, EventEmitter } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection, IConnectionOptions, SignalRConfiguration } from "ng2-signalr";
import { UserService } from "app/main/user/user.service";
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';


@Injectable()
export class SignalrService {

  public connection: ISignalRConnection;
  public onConnectionStart: EventEmitter<any>;

  public notificationConnection: ISignalRConnection;
  public onNotificationConnectionStart: EventEmitter<any>;

  constructor() {
    this.onConnectionStart = new EventEmitter<any>();
    this.onNotificationConnectionStart = new EventEmitter<any>();
  }

}

@Injectable()
export class SignalrServiceReal extends SignalrService {



  constructor(private signalR: SignalR,
    private userService: UserService) {
    super();
    this.updateAllConnections();
    this.userService.onUserChanged.subscribe(() => this.updateAllConnections());
  }

  private updateAllConnections() {
    this.updateMessengerConnection();
    this.updateNotificationsConnection();
  }


  private updateMessengerConnection() {
    if (this.userService.user) {

      var connectionOptions = new SignalRConfiguration();

      connectionOptions.hubName = "messenger";
      connectionOptions.qs = {};
      connectionOptions.qs['login'] = this.userService.user.login;
      connectionOptions.url = ConfigurationProvider.apiUrl(ServiceType.Messenger).replace("/api/", "");


      this.signalR.connect(connectionOptions).then(connection => {
        this.connection = connection;
        this.onConnectionStart.emit();
        this.connection.errors.subscribe(errors => {
          this.connection.stop();
          console.log(errors);
        })
      }).catch(error => {
        console.log(error);
      });

    } else {
      if (this.connection) this.connection.stop();
    }
  }

  private updateNotificationsConnection() {
    if (this.userService.user) {
      var connectionOptions = new SignalRConfiguration();

      connectionOptions.hubName = "notifications";
      connectionOptions.qs = {};
      connectionOptions.qs['login'] = this.userService.user.login;
      connectionOptions.url = ConfigurationProvider.apiUrl(ServiceType.Notifications).replace("/api/", "");

      this.signalR.connect(connectionOptions).then(connection => {
        this.notificationConnection = connection;
        this.onNotificationConnectionStart.emit();
        this.notificationConnection.errors.subscribe(errors => {
          this.notificationConnection.stop();
          console.log(errors);
        })
      }).catch(error => {
        console.log(error);
      });

    } else {
      if (this.notificationConnection) this.notificationConnection.stop();
    }
  }

}
