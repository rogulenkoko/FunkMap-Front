import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Message, Dialog } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";
import { DialogService } from "app/main/messenger/dialog.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { FileItem, FileUploadFinishedEvent, FileType } from 'app/tools/upload/upload.component';
import { ImageContent, FileContent, Content } from 'app/main/messenger/models/message';

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

  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.subscription = new Subscription();
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

  private onUploadedFinished($event: FileUploadFinishedEvent) {
    var item: Content;
    switch ($event.type) {

      case FileType.Image:
        item = this.images.find(x => x.name == $event.name);
        break;

      case FileType.Other:
        item = this.files.find(x => x.name == $event.name);
        break;
    }

    item.data = $event.bytes;

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
