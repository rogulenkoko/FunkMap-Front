import { Component, OnInit } from '@angular/core';
import { DialogService } from "app/main/messenger/dialog.service";
import { Dialog, DialogMessagesRequest, Message } from "app/main/messenger/models";
import { MessengerService } from "app/main/messenger/messenger.service";
import { UserService } from "app/main/user/user.service";
import { SignalrService } from "app/tools/signalr/signalr.service";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  private messages: Array<Message> = [];

  constructor(private messengerService: MessengerService,
              private dialogService: DialogService,
              private userService: UserService,
              private signalrService: SignalrService) {
    this.dialogService.onDialogChanged.subscribe(dialog => this.refreshMessages(dialog));
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
  }

  ngOnInit() {
  }

  private refreshMessages(dialog: Dialog) {
    let request = new DialogMessagesRequest(this.dialogService.dialog.receiver, 0, 20)
    this.messengerService.getDialogMessages(request).subscribe(messages=>{
      this.messages = messages;
    });
  }

  private onMessageRecieved(message: Message){
    this.messages.push(message);
  }

  private initializeSubscriptions(){
    this.messengerService.onMessageRecieved.subscribe(message=>{
      this.messages.push(message);
    });
  }

}
