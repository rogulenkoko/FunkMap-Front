import { Component, OnInit, Input } from '@angular/core';
import { Dialog } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";

@Component({
  selector: 'dialog-item',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() dialog: Dialog;

  constructor(private dialogService: DialogService) {
   }

  ngOnInit() {
    //console.log(this.dialog);
  }

}
