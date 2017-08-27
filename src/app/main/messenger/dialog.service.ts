import { Injectable, EventEmitter } from '@angular/core';
import { Dialog } from "app/main/messenger/models";

@Injectable()
export class DialogService {

  public dialog: Dialog;
  public onDialogChanged: EventEmitter<Dialog>;

  public onDialogsLoaded: EventEmitter<any>;

  constructor() {
    this.onDialogChanged = new EventEmitter<Dialog>();
    this.onDialogsLoaded = new EventEmitter();
  }

  public setDialog(dialog: Dialog){
    console.log(dialog);
    if(dialog && this.dialog && this.dialog.dialogId == dialog.dialogId) return;
    this.dialog = dialog;
    this.onDialogChanged.emit(dialog);
  }

}
