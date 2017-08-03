import { Component, OnInit } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { SignalrService } from "app/tools/signalr/signalr.service";

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  private dialogs: Array<Dialog> = [];

  private onlineUsers: Array<String> = [];


  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private signalrService: SignalrService) {
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
    if(this.signalrService.connection) this.initializeSubscriptions();

  }

  ngOnInit() {
    this.refreshDialogs();
    this.getOnlineUsers();
  }

  private refreshDialogs() {
    var request = new DialogsRequest(0, 10);
    this.messengerService.getDialogs(request).subscribe(dialogs => {
      this.dialogs = dialogs;
      console.log(dialogs);
    });
  }

  private setDialog(dialog: Dialog) {
    this.dialogService.setDialog(dialog);
  }

  private getOnlineUsers() {
    this.messengerService.getOnlineUsersLogins().subscribe(logins => {
      this.onlineUsers = logins;
      this.updateOnlineUsers();
    })
  }

  private updateOnlineUsers() {
    // this.dialogs.forEach(dialog => {
    //   if (this.onlineUsers.find(x => x == dialog.receiver)) {
    //     dialog.isOnline = true;
    //   }
    // })
  }

  private initializeSubscriptions() {
    this.messengerService.onUserConnected.subscribe(login => {
      if (!this.onlineUsers.find(x => x == login)) {
        this.onlineUsers.push(login);
        this.updateOnlineUsers();
      }
    });

    this.messengerService.onUserDisconnected.subscribe(login => {
      if (this.onlineUsers.find(x => x == login)) {
        this.onlineUsers.splice(this.onlineUsers.findIndex(x => x == login),1)
        this.updateOnlineUsers();
      }
    });
  }
}
