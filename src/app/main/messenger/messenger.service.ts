import { Injectable, EventEmitter } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest, DialogsNewMessagesCountModel, DialogUpdateResponse } from "app/main/messenger/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { BroadcastEventListener, ISignalRConnection } from "@dharapvj/ngx-signalr";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import 'rxjs/add/observable/fromPromise';
import { Subscription } from "rxjs/Subscription";
import { Subject } from 'rxjs/Subject';
import { MessengerHubService } from 'app/main/messenger/messenger-hub.service';
import { LeaveDialogRequest } from 'app/main/messenger/models/leave-dialog-request';
import { InviteParticipantsRequest } from 'app/main/messenger/models/invite-participants-request';
import { DialogReadModel } from 'app/main/messenger/models/dialog-read-model';
import { locale } from 'moment';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { CreateDialogRequest } from 'app/main/messenger/models/create-dialog-request';
import { DialogUpdateRequest } from 'app/main/messenger/models/dialog-update-request';
import { Content } from 'app/main/messenger/models/message';

@Injectable()
export abstract class MessengerService {

  constructor(protected signalrService: MessengerHubService) {

    this._onMessageRecieved = new Subject<Message>();
    this._onDialogCreated = new Subject<Dialog>();
    this._onDialogUpdated = new Subject<Dialog>();
    this._onUserDisconnected = new Subject<string>();
    this._onUserConnected = new Subject<string>();
    this._onDialogRead = new Subject<DialogReadModel>();
    this._onContentLoaded = new Subject<Content>();

    //инициализация конекшена
    this.signalrService.connection.subscribe(connection => this.subscribeEvents(connection));

    //для обновления конекшена
    this.signalrService.connectionUpdated.subscribe(connection => this.subscribeEvents(connection));
  }


  abstract sendMessage(message: Message): Observable<BaseResponse>;

  abstract startUpload(contentItem: Content): Observable<BaseResponse>;

  abstract createDialog(dialog: CreateDialogRequest): Observable<DialogUpdateResponse>;
  abstract updateDialog(dialog: DialogUpdateRequest): Observable<DialogUpdateResponse>;

  abstract inviteParticipants(request: InviteParticipantsRequest): Observable<BaseResponse>;

  abstract setOpenedDialog(dialogId: string): Observable<BaseResponse>;

  abstract getDialogMessages(request: DialogMessagesRequest): Observable<Array<Message>>;

  abstract getDialogs(): Observable<Array<Dialog>>;

  abstract getOnlineUsersLogins(): Observable<Array<string>>;

  abstract getDialogsWithNewMessagesCount(): Observable<Array<DialogsNewMessagesCountModel>>;

  abstract leaveDialog(dialogIds: LeaveDialogRequest): Observable<BaseResponse>;



  private _onMessageRecieved: Subject<Message>;
  public get onMessageRecieved(): Observable<Message> {
    return this._onMessageRecieved;
  };

  private _onDialogCreated: Subject<Dialog>;
  public get onDialogCreated(): Observable<Dialog> {
    return this._onDialogCreated;
  }

  private _onDialogUpdated: Subject<Dialog>;
  public get onDialogUpdated(): Observable<Dialog> {
    return this._onDialogUpdated;
  }

  private _onUserDisconnected: Subject<string>;
  public get onUserDisconnected(): Observable<string> {
    return this._onUserDisconnected;
  };

  private _onUserConnected: Subject<string>;
  public get onUserConnected(): Observable<string> {
    return this._onUserConnected;
  };

  private _onDialogRead: Subject<DialogReadModel>;
  public get onDialogRead(): Observable<DialogReadModel> {
    return this._onDialogRead;
  };

  private _onContentLoaded: Subject<Content>;
  public get onContentLoaded(): Observable<Content> {
    return this._onContentLoaded;
  };

  private subscribeEvents(connection: ISignalRConnection) {
    if (!connection) return;
    connection.listenFor("OnMessageSent").subscribe(message => this._onMessageRecieved.next(Message.ToMessage(message)));
    connection.listenFor("OnDialogCreated").subscribe(message => this._onDialogCreated.next(Dialog.ToDialog(message)));
    connection.listenFor("OnDialogUpdated").subscribe(message => this._onDialogUpdated.next(Dialog.ToDialog(message)));
    connection.listenFor("onUserDisconnected").subscribe((message: string) => this._onUserDisconnected.next(message));
    connection.listenFor("onUserConnected").subscribe((message: string) => this._onUserConnected.next(message));
    connection.listenFor("onDialogRead").subscribe((message: DialogReadModel) => this._onDialogRead.next(DialogReadModel.ToDialogReadModel(message)));
    connection.listenFor("OnContentLoaded").subscribe((message: Content) => this._onContentLoaded.next(Content.ToContent(message)));
  }

  private dialogsCachePrefix = "dialogs_";

  public updateCachedDialogs(user: string, dialogs: Array<Dialog>){
    localStorage.setItem(`${this.dialogsCachePrefix}${user}`, JSON.stringify(dialogs));
  }

  public getCachedDialogs(user: string): Array<Dialog>{
    var dialogsJson = localStorage.getItem(`${this.dialogsCachePrefix}${user}`);
    var dialogs = JSON.parse(dialogsJson);
    return dialogs ? dialogs : [];
  }

}

@Injectable()
export class MessengerServiceHttp extends MessengerService {


  constructor(signalrService: MessengerHubService, private http: HttpClient) {
    super(signalrService);

  }

  sendMessage(message: Message): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/message`, message).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  startUpload(contentItem: Content): Observable<BaseResponse>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/content`, contentItem).map(x => BaseResponse.ToBaseResponse(x.json()));
  }


  createDialog(dialog: CreateDialogRequest): Observable<DialogUpdateResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialog`, dialog).map(x => DialogUpdateResponse.ToDialogCreateResponse(x.json()));
  }

  updateDialog(dialog: DialogUpdateRequest): Observable<DialogUpdateResponse> {
    return this.http.put(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/updateDialog`, dialog).map(x => DialogUpdateResponse.ToDialogCreateResponse(x.json()));
  }

  inviteParticipants(request: InviteParticipantsRequest): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialog/participants`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

  setOpenedDialog(dialogId: string): Observable<BaseResponse> {
    return this.signalrService.connection.switchMap(connection => Observable.fromPromise(connection.invoke("setOpenedDialog", dialogId))).map(x => BaseResponse.ToBaseResponse(x));
  }

  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialog/messages`, request).map(x => Message.ToMessages(x.json()));
  }
  getDialogs(): Observable<Array<Dialog>> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialogs`).map(x => Dialog.ToDialogs(x.json()));
  }

  getOnlineUsersLogins(): Observable<string[]> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialogs/online`).map(x => x.json());
  }

  getDialogsWithNewMessagesCount(): Observable<Array<DialogsNewMessagesCountModel>> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialogs/new`).map(x => DialogsNewMessagesCountModel.ToDialogsNewMessagesCountModels(x.json()));
  }

  leaveDialog(request: LeaveDialogRequest): Observable<BaseResponse> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Messenger)}messenger/dialog/leave`, request).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

}
