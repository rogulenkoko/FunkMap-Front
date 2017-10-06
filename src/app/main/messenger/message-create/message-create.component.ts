import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Message, Dialog } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";
import { DialogService } from "app/main/messenger/dialog.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

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

  constructor(private messengerService: MessengerService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(this.dialogService.onDialogsLoaded.subscribe(() => this.initParams()));
    this.changeTexareaBehaviour();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initParams() {
    this.route.params.subscribe(params => {
      this.reciever = params["login"];
      this.isNewDialog = this.reciever && !this.dialogService.dialog;
    });
  }

  private sendMessage() {
    let message = new Message(this.userService.user.login, this.dialogService.dialog ? this.dialogService.dialog.dialogId : "", this.text);
    this.text = "";
    if (this.isNewDialog) {

      var dialog = new Dialog();
      dialog.participants = [this.userService.user.login, this.reciever];

      this.isNewDialog = false;
      this.reciever = "";

      this.messengerService.createDialog(dialog).subscribe(response => {
        message.dialogId = response.dialog.dialogId;
        this.messengerService.onDialogCreated.emit(response.dialog.dialogId);
        this.messengerService.sendMessage(message).subscribe(response => {

        });
      });
    } else {
      this.messengerService.sendMessage(message).subscribe(response => {

      });
    }
  }

  private changeTexareaBehaviour() {
    $("textarea").keydown(function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    });
  }

}
