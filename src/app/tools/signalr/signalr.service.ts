import { Injectable, EventEmitter } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection, IConnectionOptions, SignalRConfiguration } from "ng2-signalr";
import { UserService } from "app/main/user/user.service";
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { Observable } from 'rxjs/Observable';
import { ConnectionStatus } from 'ng2-signalr/src/services/connection/connection.status';


@Injectable()
export abstract class SignalrService {

  protected _connection: ISignalRConnection;

  public get connection(): Observable<ISignalRConnection> {
    return this.checkConnectionStatus(this._connection, this.configuration);
  }

  public notificationConnection: ISignalRConnection;
  public onNotificationConnectionStart: EventEmitter<any>;

  constructor() {
    this.onNotificationConnectionStart = new EventEmitter<any>();
  }

  protected checkConnectionStatus(connection: ISignalRConnection, config: SignalRConfiguration): Observable<ISignalRConnection> {
    if (!connection) return this.createHubConnection(config);
    var jConnection = (<any>connection)._jConnection;
    return Observable.of(this._connection);
    // console.log(jConnection.state);
    // switch (jConnection.state) {
    //   //{connecting: 0, connected: 1, reconnecting: 2, disconnected: 4}
    //   case 1: return Observable.of(connection);
    //   case 0: return Observable.of(connection);//todo
    //   case 4: return this.createHubConnection(config); //disconnected
    //   case 2: return Observable.of(null);
    //   default: return Observable.of(null);
    // }
  }

  abstract createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection>;

  abstract get configuration(): SignalRConfiguration;



}

@Injectable()
export class SignalrServiceReal extends SignalrService {

  get configuration(): SignalRConfiguration {
    var connectionOptions = new SignalRConfiguration();

    connectionOptions.hubName = "messenger";
    connectionOptions.qs = {};
    connectionOptions.qs['login'] = this.userService.user ? this.userService.user.login : "";
    connectionOptions.url = ConfigurationProvider.apiUrl(ServiceType.Messenger).replace("/api/", "");
    return connectionOptions;
  }

  constructor(private signalR: SignalR,
    private userService: UserService) {
    super();
    this.userService.onUserChanged.subscribe(() =>  this.createHubConnection(this.configuration));
  }


  public createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection> {

    if(!this.userService.user){
      console.log("дисконнект");
      if(this._connection) this._connection.stop();
      return Observable.of(null);
    }

    if(this._connection){

      this._connection.status.subscribe(s=>console.log("stat",s));

      console.log("дисконнект");
      console.log((<any>this._connection)._jConnection.state);
      var state = (<any>this._connection)._jConnection.state;
      this._connection.stop();
    }

   

    return Observable.fromPromise(this.signalR.connect(config)).switchMap(connection => {
      this._connection = connection;
      this._connection.status.subscribe(x=>{
        console.log("test",x);
      })

      this._connection.errors.subscribe(errors => {
        this._connection.stop();
        console.log(errors);
      });

      return Observable.of(connection);

    }).catch(error => {
      console.log(error);
      return Observable.of(null);
    });


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
