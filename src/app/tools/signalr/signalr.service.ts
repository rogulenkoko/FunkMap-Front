import { Injectable } from '@angular/core';
import { SignalR, SignalRConnection, ISignalRConnection } from "ng2-signalr";
import { UserService } from "app/main/user/user.service";

@Injectable()
export class SignalrService {

  public connection: ISignalRConnection;

  constructor(private signalR: SignalR,
              private userService: UserService) {
      this.createSignaRConnection();
  }


   private createSignaRConnection() {
    if (this.userService.user) {
      this.signalR.connect().then(connection => {
        this.connection = connection;
        this.connection.errors.subscribe(errors=>{
          this.connection.stop();
          console.log(errors);
        })
      }).catch(error => {
        console.log(error);
      });

    }
  }

}
