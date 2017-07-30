import { Injectable } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest } from "app/main/messenger/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { BroadcastEventListener } from "ng2-signalr";


@Injectable()
export abstract class MessengerService {

  constructor(protected signalrService: SignalrService) {
    this.initializeEvents();

  }

  abstract sendMessage(message: Message): Observable<BaseResponse>;

  abstract getDialogMessages(request: DialogMessagesRequest): Observable<Array<Message>>;

  abstract getDialogs(request: DialogsRequest): Observable<Array<Dialog>>;

  protected onMessageRecievedEvent: BroadcastEventListener<Message>;
  abstract onMessageRecieved(): Observable<Message>;

  private initializeEvents() {
    this.onMessageRecievedEvent = new BroadcastEventListener<Message>("OnMessageSent");
    this.signalrService.connection.listen(this.onMessageRecievedEvent);
  }

}

@Injectable()
export class MessengerServiceHub extends MessengerService {

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



  onMessageRecieved(): Observable<Message> {
    return this.onMessageRecievedEvent.map(x => {
      console.log(x);
      return x;
    });
  }

}
