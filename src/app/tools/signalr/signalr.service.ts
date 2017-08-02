import { Injectable, EventEmitter } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection } from "ng2-signalr";
import { UserService } from "app/main/user/user.service";

@Injectable()
export class SignalrService {

  public connection: ISignalRConnection;

  public onConnectionStart: EventEmitter<any>;

  constructor(private signalR: SignalR,
              private userService: UserService) {
      this.onConnectionStart = new EventEmitter<any>();

      this.updateSignaRConnection();
      this.userService.onUserChanged.subscribe(()=>this.updateSignaRConnection());
  }


   private updateSignaRConnection() {
    if (this.userService.user) {
      (<any>this.signalR)._configuration.qs = { login: this.userService.user.login };
      this.signalR.connect().then(connection => {
        this.connection = connection;
        this.onConnectionStart.emit();
        this.connection.errors.subscribe(errors=>{
          this.connection.stop();
          console.log(errors);
        })
      }).catch(error => {
        console.log(error);
      });

    } else {
      if(this.connection) this.connection.stop();
    }
  }

}
