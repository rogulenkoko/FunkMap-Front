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
        this.dialog.avatar = this.messagesService.usersAvatars.getValue(login);
      }
      else {
        this.userDataService.getImage(login).subscribe(image => {
          this.dialog.avatar = image;
          this.messagesService.usersAvatars.setValue(login, image);
        })
      }
    }
  }

}
