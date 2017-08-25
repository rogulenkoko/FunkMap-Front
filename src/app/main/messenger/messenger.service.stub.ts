import { Injectable } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest, DialogsNewMessagesCountModel, DialogCreateResponse } from "app/main/messenger/models";
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

  setOpenedDialog(dialogId: string): Observable<BaseResponse>{
     return Observable.of(new BaseResponse(true));
  }

  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    var message = new Message("test","1","Привет, как дела");
    return Observable.of([message]);
  }
  getDialogs(request: DialogsRequest): Observable<Dialog[]> {
    var dialog = new Dialog("1","Константинопольский Кирилл");
    var message = new Message("qwe","1","Привет, хотел бы пригласить тебя туда сюда");
    message.setDate(new Date(2017,3,24,12,12,30)); 
    dialog.lastMessage = message;
    

    var dialog2 = new Dialog("2","Роналдо Гриб");
    var message2 = new Message("qwe","1","Как дела?");
    message2.setDate(new Date(2017,7,24,12,12,30)); 
    dialog2.lastMessage = message2;
    dialog2.isOnline = true;
    return Observable.of([dialog, dialog2]);
  }

  getOnlineUsersLogins(): Observable<string[]> {
    return Observable.of(["test","rogulenkoko"]);
  }

  getDialogsWithNewMessages():Observable<Array<Dialog>>{
    return Observable.of([new Dialog("1","test")]);
  }

  getDialogsWithNewMessagesCount(dialogIds: Array<string>): Observable<Array<DialogsNewMessagesCountModel>>{
    return Observable.of([new DialogsNewMessagesCountModel("1", 2)]);
  }

  createDialog(dialog: Dialog): Observable<DialogCreateResponse>{
    return Observable.of(new DialogCreateResponse(true, "2"));
  }
}
