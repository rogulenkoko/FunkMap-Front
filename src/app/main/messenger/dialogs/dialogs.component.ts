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

    this.initializeSubscriptions();
  }

  ngOnInit() {
    this.dialogs = this.messengerService.getCachedDialogs(this.userService.user.login);

    this.route.params.subscribe(params => this.onRoute(params));

    this.refreshDialogs(this.dialogService.dialog ? this.dialogService.dialog.dialogId : undefined);
    this.getOnlineUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.setDialog(undefined);
    this.messengerService.updateCachedDialogs(this.userService.user.login, this.allDialogs);
  }

  private initializeSubscriptions() {
    this.subscription = new Subscription();

    this.subscription.add(this.messengerService.onUserConnected.subscribe(login => this.onUserConnectionChanged(login, false)));
    this.subscription.add(this.messengerService.onUserDisconnected.subscribe(login => this.onUserConnectionChanged(login, true)));
    this.subscription.add(this.messengerService.onDialogUpdated.subscribe(dialog => this.onDialogUpdated(dialog)));
    this.subscription.add(this.messengerService.onDialogRead.subscribe(readModel=> this.onDialogRead(readModel)));
    this.subscription.add(this.messengerService.onDialogCreated.subscribe(dialog=> this.onDialogCreated(dialog)));
  }

  private onRoute(params: any){
    var dialogId = params["dialogId"] as string;
    if(dialogId){
      var dialog = this.dialogs.find(x=>x.dialogId == dialogId);
      if(!dialog) this.router.navigate(["/messenger"]);
      this.setDialog(dialog);
    }

    var user = params["user"] as string;

    if(user){
      var expectedDialogs = this.dialogs.filter(x=>x.participants.length == 2 && x.participants.find(x=>x == this.userService.user.login) && x.participants.find(x=> x == user));

      if(expectedDialogs && expectedDialogs.length == 1){
        var expectedDialog = expectedDialogs[0];
        this.router.navigate(["/messenger", {dialogId: expectedDialog.dialogId}]);
      } else {
        this.createDialog(user);
      }
    }
  }

  private refreshDialogs(dialogId?: string) {
    this.messengerService.getDialogs().subscribe(dialogs => {
      this.allDialogs = dialogs;

      // this.dialogService.setDialog(dialogs[0]);//удалить

      this.filterDialogs();
      this.updateOnlineUsers();
    });
  }

  private navigateDialog(dialog: Dialog){
    this.router.navigate(["/messenger", {dialogId: dialog.dialogId}]);
  }

  private setDialog(dialog: Dialog) {
    this.dialogService.setDialog(dialog);
    
    var dialogId = dialog ? dialog.dialogId : undefined;
    this.messengerService.setOpenedDialog(dialogId).subscribe(response => {
      if (!response.success) alert("set dialog failed");
    });
  }

  private createDialog(user: string){
    var request = new CreateDialogRequest([user, this.userService.user.login]);

    this.messengerService.createDialog(request).subscribe(response=>{

    })
  }

  private getOnlineUsers() {
    this.messengerService.getOnlineUsersLogins().subscribe(logins =>{
      this.onlineUsers = logins;
      this.updateOnlineUsers();
    });
  }

  private filterDialogs() {

    if(this.dialogs){
      this.dialogs.sort((x, y) => {

        if(!x.lastMessage) return 1;
        if(!y.lastMessage) return -1;

        if (x.lastMessage.date < y.lastMessage.date) return 1;
        return -1;
      });
    }
   

    if (!this.allDialogs || !this.searchTest) {
      this.dialogs = this.allDialogs;
      return;
    }
    this.dialogs = this.allDialogs.filter(x => x.name.toLocaleLowerCase().startsWith(this.searchTest.toLocaleLowerCase()));

    
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

  private onDialogCreated(dialog: Dialog){
    this.onDialogUpdated(dialog);
    this.filterDialogs();
    this.router.navigate(["/messenger",{dialogId: dialog.dialogId}])
  }

  private onDialogUpdated(dialog: Dialog) {
    var oldDialog = this.dialogs.find(x => x.dialogId == dialog.dialogId);

    if (!oldDialog) {
      this.dialogs.push(dialog);
    } else {
      var index = this.dialogs.findIndex(x=>x.dialogId == dialog.dialogId);
      this.dialogs[index] = dialog;
    }

    if(this.dialogService.dialog && this.dialogService.dialog.dialogId == dialog.dialogId){
      this.dialogService.setDialog(dialog);
    }

    this.updateOnlineUsers();
    this.filterDialogs();

  }

  private onDialogRead(dialogRead: DialogReadModel){
    var dialog = this.dialogs.find(x=>x.dialogId == dialogRead.dialogId);
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
