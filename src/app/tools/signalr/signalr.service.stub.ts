import { Injectable, EventEmitter } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection } from "ng2-signalr";
import { UserService } from "app/main/user/user.service";
import { SignalrService } from "app/tools/signalr/signalr.service";

@Injectable()
export class SignalrServiceStub extends SignalrService {


}
