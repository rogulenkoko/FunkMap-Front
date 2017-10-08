import { Component, OnInit, Input } from '@angular/core';
import { Dialog } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { MessagesService } from "app/main/messenger/messages/messages.service";

@Component({
  selector: 'dialog-item',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() dialog: Dialog;

  constructor(private dialogService: DialogService,
    private userService: UserService,
    private userDataService: UserDataService,
    private messagesService: MessagesService) {
  }

  ngOnInit() {
    if (this.userService.user.login && this.dialog.participants && this.dialog.participants.length == 2) {
      var login = this.dialog.participants.filter(x => x != this.userService.user.login)[0];

      if (this.messagesService.usersAvatars.containsKey(login)) {
        var user = this.messagesService.usersAvatars.getValue(login);
        this.dialog.avatar = user.avatar;
        this.dialog.name = user.name;
      }
      else {
        this.userDataService.getUser(login).subscribe(response => {
          if(!response.isExist) return;
          this.dialog.avatar = response.user.avatar;
          this.messagesService.usersAvatars.setValue(login, response.user);
          this.dialog.name = response.user.name;
        })
      }
    }
  }

}
