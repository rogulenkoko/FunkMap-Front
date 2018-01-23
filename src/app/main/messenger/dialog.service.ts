import { Injectable, EventEmitter } from '@angular/core';
import { Dialog } from "app/main/messenger/models";

@Injectable()
export class DialogService {

  public dialog: Dialog;

  public dialogs: Array<Dialog> = [];
  public allDialogs: Array<Dialog> = [];

  public onDialogsLoaded: EventEmitter<any>;

  constructor() {
    this.onDialogsLoaded = new EventEmitter();
  }

  public setDialog(dialog: Dialog){
    this.dialog = dialog;
    
  }

}
