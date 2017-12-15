import { Component, OnInit } from '@angular/core';
import { MessengerServiceHttp, MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from 'app/main/messenger/dialog.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  

}
