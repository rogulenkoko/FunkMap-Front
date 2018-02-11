import { Injectable, EventEmitter } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection, IConnectionOptions, SignalRConfiguration, ConnectionStatus } from "@dharapvj/ngx-signalr";
import { UserService } from "app/main/user/user.service";
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export abstract class SignalrService {

  protected _connection: ISignalRConnection;

  public get connection(): Observable<ISignalRConnection> {
    return this.checkConnectionStatus(this._connection, this.configuration);
  }

  public connectionUpdated: Subject<ISignalRConnection>;

  constructor() {
    this.connectionUpdated = new Subject<ISignalRConnection>();
  }

  protected checkConnectionStatus(connection: ISignalRConnection, config: SignalRConfiguration): Observable<ISignalRConnection> {

    if (!connection) return this.createHubConnection(config);
    var jConnection = (<any>connection)._jConnection;
    switch (jConnection.state) {
      //{connecting: 0, connected: 1, reconnecting: 2, disconnected: 4}
      case 0: return Observable.of(connection);//todo
      case 1: return Observable.of(connection);
      case 2: return Observable.of(null);
      case 4: return this.createHubConnection(config); //disconnected

      default: return Observable.of(null);
    }
  }

  abstract createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection>;

  abstract get configuration(): SignalRConfiguration;
}
