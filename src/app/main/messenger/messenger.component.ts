import { Component, OnInit } from '@angular/core';
import { MessengerServiceHub } from "app/main/messenger/messenger.service";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(private messengerServiceHub:MessengerServiceHub) { }

  ngOnInit() {
  }

}
