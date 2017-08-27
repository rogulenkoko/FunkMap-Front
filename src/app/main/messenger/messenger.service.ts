import { Injectable, EventEmitter } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest, DialogsNewMessagesCountModel, DialogCreateResponse } from "app/main/messenger/models";
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
    if(this.signalrService.connection) this.initializeEvents();
    this.onDialogOpened = new EventEmitter();
    this.onMessagesLoaded = new EventEmitter();
    this.onDialogCreated = new EventEmitter<string>();
  }


  abstract sendMessage(message: Message): Observable<BaseResponse>;
  abstract createDialog(dialog: Dialog): Observable<DialogCreateResponse>;

  abstract setOpenedDialog(dialogId: string): Observable<BaseResponse>;

  abstract getDialogMessages(request: DialogMessagesRequest): Observable<Array<Message>>;

  abstract getDialogs(request: DialogsRequest): Observable<Array<Dialog>>;

  abstract getOnlineUsersLogins():Observable<Array<string>>;

  abstract getDialogsWithNewMessages():Observable<Array<Dialog>>;

  abstract getDialogsWithNewMessagesCount(dialogIds: Array<string>): Observable<Array<DialogsNewMessagesCountModel>>;

  private onMessageRecievedEvent: BroadcastEventListener<Message>;
  public onMessageRecieved: Observable<Message>;


  private onUserDisconnectedEvent:  BroadcastEventListener<string>;
  public onUserDisconnected: Observable<string>;

  private onUserConnectedEvent:  BroadcastEventListener<string>;
  public onUserConnected: Observable<string>;

  private onDialogReadEvent: BroadcastEventListener<string>;
  public onDialogRead: Observable<string>;

  public onDialogOpened: EventEmitter<any>;
  public onMessagesLoaded: EventEmitter<any>;
  public onDialogCreated: EventEmitter<string>;

  private initializeEvents() {
    this.onMessageRecievedEvent = this.signalrService.connection.listenFor("OnMessageSent");
    this.onMessageRecieved = this.onMessageRecievedEvent.map(x=> Message.ToMessage(x));

    this.onUserDisconnectedEvent = this.signalrService.connection.listenFor("onUserDisconnected");
    this.onUserDisconnected = this.onUserDisconnectedEvent.map(x=> x);

    this.onUserConnectedEvent = this.signalrService.connection.listenFor("onUserConnected");
    this.onUserConnected = this.onUserConnectedEvent.map(x=> x);

    this.onDialogReadEvent = this.signalrService.connection.listenFor("onDialogRead");
    this.onDialogRead = this.onDialogReadEvent.map(x=> x);
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

  createDialog(dialog: Dialog): Observable<DialogCreateResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl}messenger/createDialog`, dialog).map(x=> DialogCreateResponse.ToDialogCreateResponse(x.json()));
  }

  setOpenedDialog(dialogId: string): Observable<BaseResponse>{
    return Observable.fromPromise(this.signalrService.connection.invoke("setOpenedDialog", dialogId));
  }

  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    console.log("getDialogMessages");
    return this.http.post(`${ConfigurationProvider.apiUrl}messenger/getDialogMessages`, request).map(x=> Message.ToMessages(x.json()));
  }
  getDialogs(request: DialogsRequest): Observable<Array<Dialog>> {
    return this.http.post(`${ConfigurationProvider.apiUrl}messenger/getDialogs`, request).map(x => Dialog.ToDialogs(x.json()));
  }

  getOnlineUsersLogins(): Observable<string[]> {
    return this.http.get(`${ConfigurationProvider.apiUrl}messenger/getOnlineUsers`).map(x=> x.json());
  }

  getDialogsWithNewMessages():Observable<Array<Dialog>>{
    return this.http.get(`${ConfigurationProvider.apiUrl}messenger/getDialogsWithNewMessagesCount`).map(x=> Dialog.ToDialogs(x.json()));
  }

  getDialogsWithNewMessagesCount(dialogIds: Array<string>): Observable<Array<DialogsNewMessagesCountModel>>{
    return this.http.post(`${ConfigurationProvider.apiUrl}messenger/getDialogsNewMessagesCount`, dialogIds).map(x => DialogsNewMessagesCountModel.ToDialogsNewMessagesCountModels(x.json()));
  }

}
