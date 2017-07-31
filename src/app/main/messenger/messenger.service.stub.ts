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
    throw new Error("Method not implemented.");
  }
  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    throw new Error("Method not implemented.");
  }
  getDialogs(request: DialogsRequest): Observable<Dialog[]> {
    throw new Error("Method not implemented.");
  }
}
