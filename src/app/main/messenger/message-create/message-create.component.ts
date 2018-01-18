import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Message, Dialog } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";
import { DialogService } from "app/main/messenger/dialog.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { FileItem, FileUploadFinishedEvent, FileType } from 'app/tools/upload/upload.component';
import { ImageContent, FileContent, Content } from 'app/main/messenger/models/message';
import { Queue } from "typescript-collections";

declare var $;

@Component({
  selector: 'message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.scss']
})

export class MessageCreateComponent implements OnInit, OnDestroy {

  private text: string;
  private isNewDialog: boolean;
  private reciever: string;

  private subscription: Subscription;

  private images: Array<ImageContent> = [];
  private files: Array<FileContent> = [];

  private queue: Queue<Content>;

  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.subscription = new Subscription();
    this.queue = new Queue<Content>();
  }

  ngOnInit() {
    this.initParams();
    this.changeTexareaBehaviour();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initParams() {
    this.route.params.subscribe(params => {
      this.handleParrams(params);
    });
  }

  private handleParrams(params: any) {
    this.reciever = params["login"];
    if (!this.reciever) return;
    this.isNewDialog = this.reciever && (!this.dialogService.dialog || this.dialogService.dialog.dialogId === "");
    if (this.isNewDialog) {

    }
  }

  private sendMessage() {

    var content = this.files.concat(this.images);

    if (!this.text && (!content || content.length == 0 )) return;
    let message = new Message(this.userService.user.login, this.dialogService.dialog.dialogId, this.text);
    message.content = content;
    
    this.clear();
    this.messengerService.sendMessage(message).subscribe(response => {

    });
  }

  private onUploadedStart($event: Array<FileItem>) {

    $event.forEach(item => {
      
      switch (item.type) {
        case FileType.Image:
          if(!this.images.find(x=>x.name == item.name)) this.images.push(new ImageContent(item.name, item.size));
          break;

        case FileType.Other:
        if(!this.files.find(x=>x.name == item.name)) this.files.push(new FileContent(item.name, item.size));
          break;
      }
    });
  }

  private onUploadedFinished($event: Array<FileUploadFinishedEvent>) {

    $event.forEach(element => {
      let item: Content;
      switch (element.type) {
  
        case FileType.Image:
          item = this.images.find(x => x.name == element.name);
          break;
  
        case FileType.Other:
          item = this.files.find(x => x.name == element.name);
          break;
      }
  
      item.data = element.bytes;
      if(!this.queue.contains(item)) this.queue.enqueue(item);
    });

    
    this.subscribeServerUploaded();
  }

  private subscribeServerUploaded(){

    if(this.queue.isEmpty()) return;

    var item = this.queue.dequeue();
    var subscription = this.messengerService.onContentLoaded.subscribe(item=>{
      var allContent = this.images.map(x=> x as Content).concat(this.files.map(x=> x as Content));
      var existingItem = allContent.find(x=>x.name == item.name);
      if(!existingItem){
        subscription.unsubscribe();
        return;
      }
      existingItem.dataUrl = item.dataUrl;
      existingItem.isLoaded = true;
      subscription.unsubscribe();
      this.subscribeServerUploaded();
      
    });

    this.messengerService.startUpload(item).subscribe(repsponse=>{
      
    });
  }

  private removeContentItem(item: Content) {
    switch (item.contentType) {
      case FileType.Image:
        this.images = this.images.filter(x => x.name != item.name);
        break;

      case FileType.Other:
        this.files = this.files.filter(x => x.name != item.name);
        break;
    }
  }

  private clear() {
    this.text = "";
    this.images = [];
    this.files = [];
  }

  private changeTexareaBehaviour() {
    $("textarea").keydown(function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    });
  }

}
