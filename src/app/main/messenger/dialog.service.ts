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
    if(dialog && this.dialog && this.dialog.dialogId == dialog.dialogId){

    } else {
      this.dialog = dialog;
      this.onDialogChanged.emit(dialog);
    }
    
  }

}
