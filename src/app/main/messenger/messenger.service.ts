import { Injectable } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest } from "app/main/messenger/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { BroadcastEventListener } from "ng2-signalr";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import 'rxjs/add/observable/fromPromise';
import { Subscription } from "rxjs/Subscription";

@Injectable()
export abstract class MessengerService {

  constructor(protected signalrService: SignalrService) {
    this.signalrService.onConnectionStart.subscribe(() => this.initializeEvents());
  }


  abstract sendMessage(message: Message): Observable<BaseResponse>;

  abstract getDialogMessages(request: DialogMessagesRequest): Observable<Array<Message>>;

  abstract getDialogs(request: DialogsRequest): Observable<Array<Dialog>>;

  abstract getOnlineUsersLogins():Observable<Array<string>>;

  protected onMessageRecievedEvent: BroadcastEventListener<Message>;
  public onMessageRecieved: Observable<Message>;

  private initializeEvents() {
    this.onMessageRecievedEvent = new BroadcastEventListener<Message>("OnMessageSent");
    this.signalrService.connection.listen(this.onMessageRecievedEvent);
    this.onMessageRecieved = this.onMessageRecievedEvent.map(x=> Message.ToMessage(x));
  }

}

@Injectable()
export class MessengerServiceHub extends MessengerService {
  

  constructor(signalrService: SignalrService, private http: HttpClient) {
    super(signalrService);

  }

  sendMessage(message: Message): Observable<BaseResponse> {
    return Observable.fromPromise(this.signalrService.connection.invoke("sendMessage", message));
  }
  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    return this.http.post(`${ConfigurationProvider.apiUrl}messenger/getDialogMessages`, request).map(x=> Message.ToMessages(x.json()));
  }
  getDialogs(request: DialogsRequest): Observable<Array<Dialog>> {
    return this.http.post(`${ConfigurationProvider.apiUrl}messenger/getDialogs`, request).map(x => Dialog.ToDialogs(x.json()));
  }

  getOnlineUsersLogins(): Observable<string[]> {
    return this.http.get(`${ConfigurationProvider.apiUrl}messenger/getOnlineUsers`).map(x=> x.json());
  }

}
