import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DialogService } from "app/main/messenger/dialog.service";
import { Dialog, DialogMessagesRequest, Message } from "app/main/messenger/models";
import { MessengerService } from "app/main/messenger/messenger.service";
import { UserService } from "app/main/user/user.service";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Subscription } from "rxjs/Subscription";
import { UserDataService } from "app/main/user/user-data.service";
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {

  private messages: Array<Message> = [];

  private subscription: Subscription;

  constructor(private messengerService: MessengerService,
              private dialogService: DialogService,
              private userService: UserService,
              private userDataService: UserDataService,
              private scrollbarService: MalihuScrollbarService,
              private route: ActivatedRoute) {

    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.initializeSubscriptions();

    this.route.params.subscribe(params => this.onRoute(params));
  }

  ngAfterViewInit(){
    this.scrollbarService.initScrollbar('#main-messages-container', { axis: 'y', theme: 'minimal-dark' });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private initializeSubscriptions(){
    this.subscription.add(this.messengerService.onMessageRecieved.subscribe(message=>{
      this.onMessageRecieved(message);
    }));

    this.subscription.add(this.messengerService.onDialogRead.subscribe(dialog=>{
      if(dialog.userWhoRead == this.userService.user.login) return;
      this.onDialogRead(dialog.dialogId);
    }));
  }

  private onRoute(params: any){
    var dialogId = params["dialogId"] as string;
    if(dialogId){
      this.refreshMessages(dialogId);
    }
  }

  private refreshMessages(dialogId: string) {
    let request = new DialogMessagesRequest(dialogId, 0, 20)
    this.messengerService.getDialogMessages(request).subscribe(messages=>{
      this.messages = messages;
      this.scrollbarService.scrollTo('#main-messages-container',100000,{scrollInertia:0});
    });
  }

  private onMessageRecieved(message: Message){
    console.log(message);
    console.log(this.dialogService.dialog);
    if(!this.dialogService.dialog || this.dialogService.dialog.dialogId != message.dialogId) return;
    console.log("запушил")
    this.messages.push(message);
    console.log(this.messages);
    this.scrollbarService.scrollTo('#main-messages-container',100000,{scrollInertia:0});
  }

  private onDialogRead(dialogId: string){
    this.messages.forEach(message => {
      message.isNew = false;
    });
  }
}
