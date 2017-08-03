import { Component, OnInit } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Message } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";
import { DialogService } from "app/main/messenger/dialog.service";

@Component({
  selector: 'message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.scss']
})
export class MessageCreateComponent implements OnInit {

  private text: string;

  constructor(private messengerService: MessengerService,
              private dialogService: DialogService,
              private userService: UserService) { }

  ngOnInit() {
  }

  private sendMessage(){
    let message = new Message(this.userService.user.login, this.dialogService.dialog.dialogId, this.text)
    this.messengerService.sendMessage(message).subscribe(response=>{
      console.log(response);
    })
  }

}
