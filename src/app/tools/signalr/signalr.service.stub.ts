import { Injectable, EventEmitter } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection, SignalRConfiguration } from "ng2-signalr";
import { UserService } from "app/main/user/user.service";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignalrServiceStub extends SignalrService {
    createHubConnection(config: SignalRConfiguration): Observable<ISignalRConnection> {
        throw new Error("Method not implemented.");
    }
    configuration: SignalRConfiguration;


}
