import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DialogService } from 'app/main/messenger/dialog.service';
import { MessengerService } from 'app/main/messenger/messenger.service';
import { Dialog } from 'app/main/messenger/models';

@Component({
  selector: 'dialog-name-edit',
  templateUrl: './dialog-name-edit.component.html',
  styleUrls: ['./dialog-name-edit.component.scss']
})
export class DialogNameEditComponent implements OnInit {

  private isVisible: boolean;

  @Input() get visible(): boolean {
    return this.isVisible;
  }

  set visible(value: boolean) {
    this.isVisible = value;
    this.visibleChange.emit(this.visible);
  }

  @Output() visibleChange: EventEmitter<boolean>;

  private name: string;


  constructor(private dialogService: DialogService,
              private messengerService: MessengerService) {
    this.visibleChange = new EventEmitter<boolean>();
    this.name = this.dialogService.dialog.name;
   }

  ngOnInit() {
  }

  private changeName(){

    if(!this.name) return;

    var dialog = new Dialog(this.dialogService.dialog.dialogId, this.name);
    this.messengerService.updateDialog(dialog).subscribe(response=>{
      if(response.isSuccess) this.cancel();
    });
  }

  private cancel(){
    this.visible = false;
  }

}
