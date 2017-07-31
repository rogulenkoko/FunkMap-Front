import { Component, OnInit } from '@angular/core';
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";

@Component({
  selector: 'dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  private dialogs: Array<Dialog>;

  constructor(private messengerService:MessengerService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.refreshDialogs();
  }

  private refreshDialogs(){
    var request = new DialogsRequest(0, 10);
    this.messengerService.getDialogs(request).subscribe(dialogs=>{
      this.dialogs = dialogs;
    });
  }

  private setDialog(dialog: Dialog){
    this.dialogService.setDialog(dialog);
  }

}
