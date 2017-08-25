import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { UserService } from "app/main/user/user.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit, OnDestroy {

  private dialogs: Array<Dialog> = [];

  private onlineUsers: Array<String> = [];

  private subscription: Subscription;

  constructor(private messengerService: MessengerService,
              private dialogService: DialogService,
              private signalrService: SignalrService,
              private userService: UserService) {
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
    if(this.signalrService.connection) this.initializeSubscriptions();
    this.subscription = new Subscription();
    this.subscription.add(this.messengerService.onMessagesLoaded.subscribe(()=> this.updateDialogsNewMessagesCount()));
  }

  ngOnInit() {
    this.refreshDialogs();
    this.getOnlineUsers();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.messengerService.setOpenedDialog(null).subscribe(x=>{

    });
  }

  private refreshDialogs() {
    var request = new DialogsRequest(0, 10);
    this.messengerService.getDialogs(request).subscribe(dialogs => {
      this.dialogs = dialogs;
      this.updateOnlineUsers();
      this.updateDialogsNewMessagesCount();
    });
  }

  private setDialog(dialog: Dialog) {
    this.dialogService.setDialog(dialog);
    this.messengerService.setOpenedDialog(dialog.dialogId).subscribe(response=>{
      if(response.success) this.messengerService.onDialogOpened.emit();
    })
  }

  private getOnlineUsers() {
    this.messengerService.getOnlineUsersLogins().subscribe(logins => {
      this.onlineUsers = logins;
     
    })
  }

  private updateOnlineUsers() {
    this.dialogs.forEach(dialog => {
      if(dialog.participants && dialog.participants.length == 2){
        var anotherUserLogin = dialog.participants.find(x=>x != this.userService.user.login);
        if(this.onlineUsers.find(x=> x== anotherUserLogin)) dialog.isOnline = true;
        else dialog.isOnline = false;
      }
    })
  }

  private updateDialogsNewMessagesCount(){
    this.messengerService.getDialogsWithNewMessagesCount(this.dialogs.map(x=>x.dialogId)).subscribe(models=>{
      this.dialogs.forEach(dialog => {
        dialog.newMessagesCount = models.find(x=>x.dialogId == dialog.dialogId) ? models.find(x=>x.dialogId == dialog.dialogId).newMessagesCount : 0;
      });
    });
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

     this.messengerService.onMessageRecieved.subscribe((message)=> {
        this.refreshDialogs();
     })
  }
}
