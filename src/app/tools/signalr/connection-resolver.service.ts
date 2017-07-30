import { Injectable } from '@angular/core';
import { SignalR, SignalRConnection } from 'ng2-signalr';

@Injectable()
export class ConnectionResolver {

  constructor(private _signalR: SignalR) { }

  resolve() {
    console.log('ConnectionResolver. Resolving...');
    return this._signalR.connect();
  }

}
