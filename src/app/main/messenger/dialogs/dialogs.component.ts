import { Component, OnInit } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  private dialogs: Array<Dialog> = [];

  private onlineUsers: Array<String> = [];


  constructor(private messengerService:MessengerService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.refreshDialogs();
    this.getOnlineUsers();
  }

  private refreshDialogs(){
    var request = new DialogsRequest(0, 10);
    this.messengerService.getDialogs(request).subscribe(dialogs=>{
      this.dialogs = dialogs;
    });
  }

  private setDialog(dialog: Dialog){
    this.dialogService.setDialog(dialog);
  }

  private getOnlineUsers(){
    this.messengerService.getOnlineUsersLogins().subscribe(logins=>{
      this.onlineUsers = logins;console.log(logins);
    })
  }

  private checkIfOnline(login: string): boolean{
    return this.onlineUsers.find(x=> x == login) ? true : false;
  }

}
