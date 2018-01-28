import { Component, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
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

  private messagesPackCount = 20;
  private messagesContainerId = '#main-messages-container';

  private scrollbarOptions: MCustomScrollbar.CustomScrollbarOptions;

  constructor(private messengerService: MessengerService,
              public dialogService: DialogService,
              private userService: UserService,
              private userDataService: UserDataService,
              private scrollbarService: MalihuScrollbarService,
              private route: ActivatedRoute,
            private ngZone: NgZone) {

    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.initializeSubscriptions();

    this.route.params.subscribe(params => this.onRoute(params));
  }

  ngAfterViewInit(){

    this.initScroll();
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
    let request = new DialogMessagesRequest(dialogId, 0, this.messagesPackCount)
    this.messengerService.getDialogMessages(request).subscribe(messages=>{
      this.messages = messages;
     
      this.scrollbarService.scrollTo(this.messagesContainerId,100000,{scrollInertia:0});
    });
  }

  private getMoreMessages(){
    var dialogId = this.dialogService.dialog.dialogId;
    let request = new DialogMessagesRequest(dialogId, this.messages.length, this.messagesPackCount);

    this.messengerService.getDialogMessages(request).subscribe(messages=>{
      this.ngZone.run(()=>{
        this.messages = messages.concat(this.messages);
      })
      
    });
  }

  private onMessageRecieved(message: Message){
    if(!this.dialogService.dialog || this.dialogService.dialog.dialogId != message.dialogId) return;
    this.messages.push(message);
    this.scrollbarService.scrollTo(this.messagesContainerId,100000,{scrollInertia:0});
  }

  private onDialogRead(dialogId: string){
    this.messages.forEach(message => {
      message.isNew = false;
    });
  }

  private initScroll(){
    var that = this;
    this.scrollbarOptions = <MCustomScrollbar.CustomScrollbarOptions>{ 
      axis: 'y', 
      theme: 'minimal-dark',
      scrollInertia: 500,
      callbacks: {
        onTotalScrollBackOffset: 500,
        onTotalScrollBack: ()=> that.getMoreMessages()
      },
      advanced:{ updateOnContentResize: true, updateOnSelectorChange: this.messagesContainerId } 
    };

    this.scrollbarService.initScrollbar(this.messagesContainerId, this.scrollbarOptions); 
  }
}
