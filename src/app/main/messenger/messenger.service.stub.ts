import { Injectable } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest } from "app/main/messenger/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { BroadcastEventListener } from "ng2-signalr";
import { MessengerService } from "app/main/messenger/messenger.service";


@Injectable()
export class MessengerServiceStub extends MessengerService {
  

  constructor(signalrService: SignalrService) {
    super(signalrService);

  }

  sendMessage(message: Message): Observable<BaseResponse> {
    return Observable.of(new BaseResponse(true));
  }
  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    var message = new Message("test","1","Привет, как дела");
    return Observable.of([message]);
  }
  getDialogs(request: DialogsRequest): Observable<Dialog[]> {
    var dialog = new Dialog("1","test");
    return Observable.of([dialog]);
  }

  getOnlineUsersLogins(): Observable<string[]> {
    return Observable.of(["test","rogulenkoko"]);
  }
}
