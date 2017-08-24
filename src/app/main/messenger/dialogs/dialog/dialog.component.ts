import { Component, OnInit, Input } from '@angular/core';
import { Dialog } from "app/main/messenger/models";

@Component({
  selector: 'dialog-item',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() dialog: Dialog;

  constructor() { }

  ngOnInit() {
    //console.log(this.dialog);
  }

}
