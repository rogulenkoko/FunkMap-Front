import { Component, OnInit } from '@angular/core';
import { DialogService } from 'app/main/messenger/dialog.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { User } from 'app/main/user/user';
import { MessengerService } from 'app/main/messenger/messenger.service';
import { Dialog } from 'app/main/messenger/models';
import { UserService } from 'app/main/user/user.service';

@Component({
  selector: 'dialog-bar',
  templateUrl: './dialog-bar.component.html',
  styleUrls: ['./dialog-bar.component.scss']
})
export class DialogBarComponent implements OnInit {

  private isAddToDialogMode: boolean;
  private isNewDialog: boolean;
  private dialogName: string;

  private search: string;

  private newUser: User;
  private addedUsers: Array<User> = [];

  constructor(private dialogService: DialogService,
    private userDataService: UserDataService,
    private messengerService: MessengerService) { }

  ngOnInit() {
  }

  private addToDialog() {
    this.isAddToDialogMode = true;
    this.isNewDialog = this.dialogService.dialog.participants.length <= 2;
  }


  private finish() {
    if (this.addedUsers.length == 0) {
      this.isAddToDialogMode = false;
      return;
    }
    var dialog = new Dialog();
    dialog.participants = this.addedUsers.map(x => x.login).concat(this.dialogService.dialog.participants);

    if (this.isNewDialog) {
      dialog.name = this.dialogName;
      this.messengerService.createDialog(dialog).subscribe(response => {
        if (response.isSuccess) {
          this.messengerService.onDialogCreated.emit(response.dialogId);
          this.isAddToDialogMode = false;
        }
      })
    } else {
      dialog.dialogId = this.dialogService.dialog.dialogId;
      this.messengerService.updateDialog(dialog).subscribe(response=>{
        this.isAddToDialogMode = false;
      })
    }


  }


  private searchUser() {
    if (!this.search) {
      this.newUser = undefined;
      return;
    }
    this.userDataService.getUser(this.search).subscribe(response => {
      if (response.isExist) {
        this.newUser = response.user;
      } else {
        this.newUser = undefined;
      }
    });
  }

  private addUser(user: User) {
    if (this.addedUsers.find(x => x.login == user.login) || this.dialogService.dialog.participants.find(x => x == user.login)) {
      return;
    }
    this.newUser = undefined;
    this.addedUsers.push(user);
  }

  private removeUser(user: User) {
    if (this.addedUsers.find(x => x.login == user.login)) {
      this.addedUsers.splice(this.addedUsers.findIndex(x => x.login == user.login), 1);
    }
  }
}
