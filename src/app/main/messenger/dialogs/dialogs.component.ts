import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { UserService } from "app/main/user/user.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit, OnDestroy {

  private dialogs: Array<Dialog> = [];
  private allDialogs: Array<Dialog> = [];

  private onlineUsers: Array<String> = [];

  private isCreateDialogMode: boolean;

  private subscription: Subscription;

  private searchTest: string;

  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private signalrService: SignalrService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
    this.subscription = new Subscription();
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
    if (this.signalrService.connection) this.initializeSubscriptions();
    this.subscription.add(this.messengerService.onMessagesLoaded.subscribe(() => this.updateDialogsNewMessagesCount()));
    this.subscription.add(this.messengerService.onDialogCreated.subscribe((dialogId) => this.refreshDialogs(dialogId)));
    this.subscription.add(this.dialogService.onDialogChanged.subscribe((dialog: Dialog) => {
      this.messengerService.setOpenedDialog(dialog ? dialog.dialogId : undefined).subscribe(x => {

      });
    }));
  }

  ngOnInit() {
    this.refreshDialogs(this.dialogService.dialog ? this.dialogService.dialog.dialogId : undefined);
    this.getOnlineUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dialogService.setDialog(undefined);
  }

  private refreshDialogs(dialogId?: string) {
    this.messengerService.getDialogs().subscribe(dialogs => {
      this.allDialogs = dialogs;

      //this.dialogService.setDialog(dialogs[0]);//удалить

      this.filterDialogs();
      if (dialogId) {
        this.dialogService.setDialog(this.dialogs.find(x => x.dialogId == dialogId));
        this.dialogService.onDialogsLoaded.emit();
      } else {
        this.route.params.subscribe(params => {
          var login = params["login"];

          if (!login) return;
          var newDialog = new Dialog("", login);
          newDialog.participants = [login, this.userService.user];
          if (!this.dialogs || this.dialogs.length == 0){
            this.dialogs = [newDialog];
          };
          var dialog = this.dialogs.find(x => JSON.stringify(x.participants.sort()) == JSON.stringify([login, this.userService.user.login].sort()));
          if (!dialog){
            this.dialogService.dialog = newDialog;
            return; 
          };

          this.dialogService.setDialog(dialog);
          this.dialogService.onDialogsLoaded.emit();
        });
      }

      this.updateOnlineUsers();
      this.updateDialogsNewMessagesCount();
    });
  }

  private setDialog(dialog: Dialog) {
    this.dialogService.setDialog(dialog);
    this.messengerService.setOpenedDialog(dialog.dialogId).subscribe(response => {
      if (response.success) this.messengerService.onDialogOpened.emit();
    });
    this.router.navigate(['/messenger']);
  }

  private getOnlineUsers() {
    this.messengerService.getOnlineUsersLogins().subscribe(logins => {
      this.onlineUsers = logins;

    })
  }

  private filterDialogs() {

    if (!this.allDialogs || !this.searchTest) {
      this.dialogs = this.allDialogs;
      return;
    }
    this.dialogs = this.allDialogs.filter(x => x.name.toLocaleLowerCase().startsWith(this.searchTest.toLocaleLowerCase()));
  }

  private updateOnlineUsers() {
    this.dialogs.forEach(dialog => {
      if (dialog.participants && dialog.participants.length == 2) {
        var anotherUserLogin = dialog.participants.find(x => x != this.userService.user.login);
        if (this.onlineUsers.find(x => x == anotherUserLogin)) dialog.isOnline = true;
        else dialog.isOnline = false;
      }
    })
  }

  private updateDialogsNewMessagesCount() {
    this.messengerService.getDialogsWithNewMessagesCount(this.dialogs.map(x => x.dialogId)).subscribe(models => {
      this.dialogs.forEach(dialog => {
        dialog.newMessagesCount = models.find(x => x.dialogId == dialog.dialogId) ? models.find(x => x.dialogId == dialog.dialogId).newMessagesCount : 0;
      });
    });
  }

  private toCreateDialogMode(){
    this.isCreateDialogMode = true;
  }

  private initializeSubscriptions() {
    this.subscription.add(this.messengerService.onUserConnected.subscribe(login => {
      if (!this.onlineUsers.find(x => x == login)) {
        this.onlineUsers.push(login);
        this.updateOnlineUsers();
      }
    }));

    this.subscription.add(this.messengerService.onUserDisconnected.subscribe(login => {
      if (this.onlineUsers.find(x => x == login)) {
        this.onlineUsers.splice(this.onlineUsers.findIndex(x => x == login), 1)
        this.updateOnlineUsers();
      }
    }));

    this.subscription.add(this.messengerService.onMessageRecieved.subscribe((message) => {
      this.refreshDialogs(this.dialogService.dialog ? this.dialogService.dialog.dialogId : undefined);
    }));

    this.subscription.add(this.messengerService.onDialogRead.subscribe(dialogId => {
      var dialog = this.dialogs.find(x => x.dialogId == dialogId);
      if (!dialog) return;
      if (dialog.lastMessage && dialog.lastMessage.sender == this.userService.user.login) dialog.lastMessage.isNew = false;
    }))
  }
}
