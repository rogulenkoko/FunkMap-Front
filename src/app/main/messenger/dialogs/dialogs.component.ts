import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { UserService } from "app/main/user/user.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogReadModel } from 'app/main/messenger/models/dialog-read-model';
import { CreateDialogRequest } from 'app/main/messenger/models/create-dialog-request';

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit, OnDestroy {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  private onlineUsers: Array<String> = [];

  private isCreateDialogMode: boolean;

  private subscription: Subscription;

  private searchTest: string;

  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {

    this.initializeSubscriptions();
  }

  ngOnInit() {
    
    this.dialogService.dialogs = this.messengerService.getCachedDialogs(this.userService.user.login);
    this.refreshDialogs(this.dialogService.dialog ? this.dialogService.dialog.dialogId : undefined);
    this.getOnlineUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   
    if(this.userService.user) this.messengerService.updateCachedDialogs(this.userService.user.login, this.dialogService.allDialogs);
  }

  private initializeSubscriptions() {
    this.subscription = new Subscription();

    this.subscription.add(this.messengerService.onUserConnected.subscribe(login => this.onUserConnectionChanged(login, false)));
    this.subscription.add(this.messengerService.onUserDisconnected.subscribe(login => this.onUserConnectionChanged(login, true)));
    this.subscription.add(this.messengerService.onDialogUpdated.subscribe(dialog => this.onDialogUpdated(dialog)));
    this.subscription.add(this.messengerService.onDialogRead.subscribe(readModel=> this.onDialogRead(readModel)));
    this.subscription.add(this.messengerService.onDialogCreated.subscribe(dialog=> this.onDialogCreated(dialog)));
  }


  private refreshDialogs(dialogId?: string) {
    this.messengerService.getDialogs().subscribe(dialogs => {
      this.dialogService.allDialogs = dialogs;

      //this.dialogService.setDialog(dialogs[0]);//удалить

      this.filterDialogs();
      this.updateOnlineUsers();
    });
  }

  private navigateDialog(dialog: Dialog){
    this.router.navigate(["/messenger", {dialogId: dialog.dialogId}]);
  }

  private getOnlineUsers() {
    this.messengerService.getOnlineUsersLogins().subscribe(logins =>{
      this.onlineUsers = logins;
      this.updateOnlineUsers();
    });
  }

  private filterDialogs() {

    if(this.dialogService.dialogs){
      this.dialogService.dialogs.sort((x, y) => {

        if(!x.lastMessage) return 1;
        if(!y.lastMessage) return -1;

        if (x.lastMessage.date < y.lastMessage.date) return 1;
        return -1;
      });
    }
   

    if (!this.dialogService.allDialogs || !this.searchTest) {
      this.dialogService.dialogs = this.dialogService.allDialogs;
      return;
    }
    this.dialogService.dialogs = this.dialogService.allDialogs.filter(x => x.name.toLocaleLowerCase().startsWith(this.searchTest.toLocaleLowerCase()));

    
  }

  private updateOnlineUsers() {

    this.dialogService.dialogs.forEach(dialog => {
      if (!dialog.participants || dialog.participants.length != 2) return;

      var anotherUserLogin = dialog.participants.find(x => x != this.userService.user.login);

      if (this.onlineUsers.find(x => x == anotherUserLogin)) dialog.isOnline = true;
      else dialog.isOnline = false;

    })
  }

  private toCreateDialogMode() {
    this.isCreateDialogMode = true;
  }

  private onDialogCreated(dialog: Dialog){
    this.onDialogUpdated(dialog);
    this.filterDialogs();
    this.router.navigate(["/messenger",{dialogId: dialog.dialogId}])
  }

  private onDialogUpdated(dialog: Dialog) {
    var oldDialog = this.dialogService.dialogs.find(x => x.dialogId == dialog.dialogId);

    if (!oldDialog) {
      this.dialogService.dialogs.push(dialog);
    } else {
      var index = this.dialogService.dialogs.findIndex(x=>x.dialogId == dialog.dialogId);
      this.dialogService.dialogs[index] = dialog;
    }

    if(this.dialogService.dialog && this.dialogService.dialog.dialogId == dialog.dialogId){
      this.dialogService.setDialog(dialog);
    }

    this.updateOnlineUsers();
    this.filterDialogs();

  }

  private onDialogRead(dialogRead: DialogReadModel){
    var dialog = this.dialogService.dialogs.find(x=>x.dialogId == dialogRead.dialogId);
    if(!dialog) return;
    

    if(dialogRead.userWhoRead == this.userService.user.login){
      dialog.newMessagesCount = 0;
    } else {
      dialog.lastMessage.isNew = false;
    }
    
    this.updateOnlineUsers();
  }

  private onUserConnectionChanged(login: string, isDisconnected: boolean) {
    if (!this.onlineUsers.find(x => x == login)) {

      if (isDisconnected) {
        this.onlineUsers.splice(this.onlineUsers.findIndex(x => x == login), 1)
      } else {
        this.onlineUsers.push(login);
      }


    }

    this.updateOnlineUsers();
  }


}
