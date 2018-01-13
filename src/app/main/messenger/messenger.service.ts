import { Injectable, EventEmitter } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest, DialogsNewMessagesCountModel, DialogUpdateResponse } from "app/main/messenger/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { BroadcastEventListener } from "ng2-signalr";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import 'rxjs/add/observable/fromPromise';
import { Subscription } from "rxjs/Subscription";
import { ISignalRConnection } from 'ng2-signalr/src/services/connection/i.signalr.connection';
import { Subject } from 'rxjs/Subject';
import { MessengerHubService } from 'app/main/messenger/messenger-hub.service';
import { LeaveDialogRequest } from 'app/main/messenger/models/leave-dialog-request';
import { InviteParticipantsRequest } from 'app/main/messenger/models/invite-participants-request';

@Injectable()
export abstract class MessengerService {

  constructor(protected signalrService: MessengerHubService) {

    this._onMessageRecieved = new Subject<Message>();
    this._onDialogCreated = new Subject<Dialog>();
    this._onDialogUpdated = new Subject<Dialog>();
    this._onUserDisconnected = new Subject<string>();
    this._onUserConnected = new Subject<string>();
    this._onDialogRead = new Subject<string>();

    //инициализация конекшена
    this.signalrService.connection.subscribe(connection=>this.subscribeEvents(connection));

    //для обновления конекшена
    this.signalrService.connectionUpdated.subscribe(connection=>this.subscribeEvents(connection));
  }


  abstract sendMessage(message: Message): Observable<BaseResponse>;
  abstract createDialog(dialog: Dialog): Observable<DialogUpdateResponse>;
  abstract updateDialog(dialog: Dialog): Observable<DialogUpdateResponse>;

  abstract inviteParticipants(request: InviteParticipantsRequest): Observable<BaseResponse>;

  abstract setOpenedDialog(dialogId: string): Observable<BaseResponse>;

  abstract getDialogMessages(request: DialogMessagesRequest): Observable<Array<Message>>;

  abstract getDialogs(): Observable<Array<Dialog>>;

  abstract getOnlineUsersLogins():Observable<Array<string>>;

  abstract getDialogsWithNewMessagesCount():Observable<Array<DialogsNewMessagesCountModel>>;

  abstract leaveDialog(dialogIds: LeaveDialogRequest): Observable<BaseResponse>;

  

  private _onMessageRecieved: Subject<Message>;
  public get onMessageRecieved(): Observable<Message>{
    return this._onMessageRecieved;
  };

  private _onDialogCreated: Subject<Dialog>;
  public get onDialogCreated(): Observable<Dialog>{
    return this._onDialogCreated;
  }

  private _onDialogUpdated: Subject<Dialog>;
  public get onDialogUpdated(): Observable<Dialog>{
    return this._onDialogUpdated;
  }

  private _onUserDisconnected: Subject<string>;
  public get onUserDisconnected(): Observable<string>{
    return this._onUserDisconnected;
  };

  private _onUserConnected: Subject<string>;
  public get onUserConnected(): Observable<string>{
    return this._onUserConnected;
  };

  private _onDialogRead: Subject<string>;
  public get onDialogRead(): Observable<string>{
    return this._onDialogRead;
  };

  private subscribeEvents(connection: ISignalRConnection){
    if(!connection) return;
    connection.listenFor("OnMessageSent").subscribe(message=>this._onMessageRecieved.next(Message.ToMessage(message)));
    connection.listenFor("OnDialogCreated").subscribe(message=>this._onDialogCreated.next(Dialog.ToDialog(message)));
    connection.listenFor("OnDialogUpdated").subscribe(message=>this._onDialogUpdated.next(Dialog.ToDialog(message)));
    connection.listenFor("onUserDisconnected").subscribe((message:string)=>this._onUserDisconnected.next(message));
    connection.listenFor("onUserConnected").subscribe((message:string)=>this._onUserConnected.next(message));
    connection.listenFor("onDialogRead").subscribe((message:string)=>this._onDialogRead.next(message));
  }

}

@Injectable()
export class MessengerServiceHttp extends MessengerService {
  

  constructor(signalrService: MessengerHubService, private http: HttpClient) {
    super(signalrService);

  }

  sendMessage(message: Message): Observable<BaseResponse> {
    return this.signalrService.connection.switchMap(connection=>{console.log(1,connection);return Observable.fromPromise(connection.invoke("sendMessage", message))}).map(x=>BaseResponse.ToBaseResponse(x));
  }

  createDialog(dialog: Dialog): Observable<DialogUpdateResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/createDialog`, dialog).map(x=> DialogUpdateResponse.ToDialogCreateResponse(x.json()));
  }

  updateDialog(dialog: Dialog): Observable<DialogUpdateResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/updateDialog`, dialog).map(x=> DialogUpdateResponse.ToDialogCreateResponse(x.json()));
  }

  inviteParticipants(request: InviteParticipantsRequest): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/inviteParticipants`, request).map(x=> BaseResponse.ToBaseResponse(x.json()));
  }
  
  setOpenedDialog(dialogId: string): Observable<BaseResponse>{
    return this.signalrService.connection.switchMap(connection=> Observable.fromPromise(connection.invoke("setOpenedDialog", dialogId))).map(x=>BaseResponse.ToBaseResponse(x));
  }

  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/getDialogMessages`, request).map(x=> Message.ToMessages(x.json()));
  }
  getDialogs(): Observable<Array<Dialog>> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/getDialogs`).map(x => Dialog.ToDialogs(x.json()));
  }

  getOnlineUsersLogins(): Observable<string[]> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/getOnlineUsers`).map(x=> x.json());
  }

  getDialogsWithNewMessagesCount():Observable<Array<DialogsNewMessagesCountModel>>{
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/getDialogsWithNewMessagesCount`).map(x=> DialogsNewMessagesCountModel.ToDialogsNewMessagesCountModels(x.json()));
  }

  leaveDialog(request: LeaveDialogRequest): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/leaveDialog`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

}
