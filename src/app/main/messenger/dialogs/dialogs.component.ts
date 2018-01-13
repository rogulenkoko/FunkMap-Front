import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { UserService } from "app/main/user/user.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit, OnDestroy {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  private dialogs: Array<Dialog> = [];
  private allDialogs: Array<Dialog> = [];

  private onlineUsers: Array<String> = [];

  private isCreateDialogMode: boolean;

  private subscription: Subscription;

  private searchTest: string;

  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
    this.subscription = new Subscription();

    this.initializeSubscriptions();


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

      // this.dialogService.setDialog(dialogs[0]);//удалить

      this.filterDialogs();

      //todo механизм начала диалога когда тыкнул создать диалог вне месенджера

      this.updateOnlineUsers();
    });
  }

  private setDialog(dialog: Dialog) {
    this.dialogService.setDialog(dialog);
    this.messengerService.setOpenedDialog(dialog.dialogId).subscribe(response => {
      if (!response.success) alert("set dialog error");
    });
    //this.router.navigate(['/messenger']);
  }

  private getOnlineUsers() {
    this.messengerService.getOnlineUsersLogins().subscribe(logins => this.onlineUsers = logins);
  }

  private filterDialogs() {

    if (!this.allDialogs || !this.searchTest) {
      this.dialogs = this.allDialogs;
      return;
    }
    this.dialogs = this.allDialogs.filter(x => x.name.toLocaleLowerCase().startsWith(this.searchTest.toLocaleLowerCase()));

    this.dialogs.sort((x, y) => {

      if (!x.lastMessage || !x.lastMessage) return -1;

      if (x.lastMessage.date < y.lastMessage.date) return -1;
      return 1;
    });
  }

  private updateOnlineUsers() {
    this.dialogs.forEach(dialog => {
      if (!dialog.participants || dialog.participants.length != 2) return;

      var anotherUserLogin = dialog.participants.find(x => x != this.userService.user.login);

      if (this.onlineUsers.find(x => x == anotherUserLogin)) dialog.isOnline = true;
      else dialog.isOnline = false;

    })
  }

  private toCreateDialogMode() {
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
      //todo
      //this.refreshDialogs(this.dialogService.dialog ? this.dialogService.dialog.dialogId : undefined);
    }));

    this.subscription.add(this.messengerService.onDialogUpdated.subscribe(dialog => {
      var index = this.dialogs.findIndex(x => x.dialogId == dialog.dialogId);
      this.dialogs[index] = dialog;

      if (dialog.lastMessage && dialog.lastMessage.sender == this.userService.user.login) {
        dialog.lastMessage.isNew = false;
      }

     
    }))
  }
}
