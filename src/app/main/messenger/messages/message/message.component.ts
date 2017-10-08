import { Component, OnInit, Input } from '@angular/core';
import { Message } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";
import { MessagesService } from "app/main/messenger/messages/messages.service";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor(private userService: UserService,
              private messagesService: MessagesService) { }

  ngOnInit() {
    if(this.messagesService.usersAvatars.containsKey(this.message.sender)){
      var user = this.messagesService.usersAvatars.getValue(this.message.sender);
      if(!user) return; //todo
      this.message.avatar = user.avatar;
    }
  }

}
