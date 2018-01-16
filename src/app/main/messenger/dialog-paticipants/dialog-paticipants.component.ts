import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { DialogService } from 'app/main/messenger/dialog.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { User, UserResponse } from 'app/main/user/user';
import { Dialog } from 'primeng/primeng';
import { UserService } from 'app/main/user/user.service';
import { MessengerService } from 'app/main/messenger/messenger.service';
import { LeaveDialogRequest } from 'app/main/messenger/models/leave-dialog-request';

@Component({
  selector: 'dialog-paticipants',
  templateUrl: './dialog-paticipants.component.html',
  styleUrls: ['./dialog-paticipants.component.scss']
})
export class DialogPaticipantsComponent implements OnInit {


  @ViewChild("dialogComponent") dialogComponent: Dialog;

  private isVisible: boolean;

  @Input() get visible(): boolean {
    return this.isVisible;
  }

  set visible(value: boolean) {
    this.isVisible = value;
    this.visibleChange.emit(this.visible);
  }

  @Output() visibleChange: EventEmitter<boolean>;

  @Input() userIsCreator: boolean;

  private users: Array<User>;

  constructor(private dialogService: DialogService,
    private userDataService: UserDataService,
    private userService: UserService,
    private messengerService: MessengerService) {
    this.visibleChange = new EventEmitter<boolean>();
    this.dialogService.dialog.name
  }

  ngOnInit() {
    this.refreshUsers();
  }

  private refreshUsers() {
    this.users = [];

    if (!this.dialogComponent) return;

    var userLogins = this.dialogService.dialog.participants;
    userLogins.forEach(userLogin => this.userDataService.getUser(userLogin).subscribe(user => this.onUserRecieved(user, userLogin, userLogins)));
  }


  private onUserRecieved(user: UserResponse, userLogin: string, userLogins: Array<string>) {
    if (user.isExist) this.users.push(user.user);

    if (userLogin == userLogins[userLogins.length - 1]) {
      this.dialogComponent.show();
      this.users.sort((x, y) => x.login == this.userService.user.login ? -1 : 1);
    }
  }

  private removeUser(login: string) {
    var request = new LeaveDialogRequest(this.dialogService.dialog.dialogId, login);
    this.messengerService.leaveDialog(request).subscribe(response => {
      if (response.success) {
        this.users = this.users.filter(x => x.login != login);
      }
    });
  }

  private onHide() {
    this.isVisible = false;
  }

}
