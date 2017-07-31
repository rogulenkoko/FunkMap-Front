import { Injectable, EventEmitter } from '@angular/core';
import { Dialog } from "app/main/messenger/models";

@Injectable()
export class DialogService {

  public dialog: Dialog;
  public onDialogChanged: EventEmitter<Dialog>;

  constructor() {
    this.onDialogChanged = new EventEmitter<Dialog>();
  }

  public setDialog(dialog: Dialog){
    this.dialog = dialog;
    this.onDialogChanged.emit(dialog);
  }

}
