import { Component, OnInit, Input } from '@angular/core';
import { Message } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

}
