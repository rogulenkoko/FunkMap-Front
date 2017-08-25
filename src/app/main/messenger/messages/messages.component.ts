import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from "app/main/messenger/dialog.service";
import { Dialog, DialogMessagesRequest, Message } from "app/main/messenger/models";
import { MessengerService } from "app/main/messenger/messenger.service";
import { UserService } from "app/main/user/user.service";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  private messages: Array<Message> = [];

  private subscription: Subscription;

  constructor(private messengerService: MessengerService,
              private dialogService: DialogService,
              private userService: UserService,
              private signalrService: SignalrService) {

    this.subscription = new Subscription();
    
    this.subscription.add(this.dialogService.onDialogChanged.subscribe(dialog => this.refreshMessages(dialog)));
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
    if(this.signalrService.connection) this.initializeSubscriptions();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private refreshMessages(dialog: Dialog) {
    let request = new DialogMessagesRequest(this.dialogService.dialog.dialogId, 0, 20)
    this.messengerService.getDialogMessages(request).subscribe(messages=>{
      this.messages = messages;
      this.messengerService.onMessagesLoaded.emit();
    });
  }

  private onMessageRecieved(message: Message){
    console.log(this.dialogService.dialog.dialogId);
    console.log(message.dialogId);

    if(this.dialogService.dialog.dialogId != message.dialogId) return;
    this.messages.push(message);
  }

  private initializeSubscriptions(){
    this.messengerService.onMessageRecieved.subscribe(message=>{
      this.onMessageRecieved(message);
    });
  }

}
