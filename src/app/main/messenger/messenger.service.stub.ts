import { Injectable } from '@angular/core';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Message, Dialog, DialogMessagesRequest, DialogsRequest, DialogsNewMessagesCountModel, DialogUpdateResponse } from "app/main/messenger/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { BroadcastEventListener } from "ng2-signalr";
import { MessengerService } from "app/main/messenger/messenger.service";
import { MessengerHubService } from 'app/main/messenger/messenger-hub.service';
import { LeaveDialogRequest } from 'app/main/messenger/models/leave-dialog-request';
import { InviteParticipantsRequest } from 'app/main/messenger/models/invite-participants-request';
import { CreateDialogRequest } from 'app/main/messenger/models/create-dialog-request';


@Injectable()
export class MessengerServiceStub extends MessengerService {
  

  constructor(protected signalrService: MessengerHubService) {
    super(signalrService);
  }

  sendMessage(message: Message): Observable<BaseResponse> {
    return Observable.of(new BaseResponse(true));
  }

  setOpenedDialog(dialogId: string): Observable<BaseResponse>{
     return Observable.of(new BaseResponse(true));
  }

  updateDialog(dialog: Dialog): Observable<DialogUpdateResponse>{
    return Observable.of(new DialogUpdateResponse(true));
  }

  getDialogMessages(request: DialogMessagesRequest): Observable<Message[]> {
    var message = new Message("test1","1","Привет, клево играешь на гитаре", new Date(2017,7,24,9,24,30));
    var message2 = new Message("test","1","Спасибо большое, чувак, я вот пишу тебе большой текст, а знаешь для чего? не знаешь? а для того, чтобы посмотреть как будет отображаться сообщение когда будет оч оч много текста", new Date(2017,3,24,12,12,30));
    message2.isNew = true;
    return Observable.of([message, message2]);
  }
  getDialogs(): Observable<Dialog[]> {
    var dialog = new Dialog("1","Константинопольский Кирилл");
    var message = new Message("qwe","1","Привет, хотел бы пригласить тебя туда сюда", new Date(2017,3,24,12,12,30));
   
    dialog.lastMessage = message;
    dialog.participants = []

    var dialog2 = new Dialog("2","Роналдо Гриб");
    var message2 = new Message("test","1","Как дела?", new Date(2017,7,24,12,12,30));
    message2.isNew = true;
    dialog2.lastMessage = message2;
    dialog2.isOnline = true;
    dialog2.participants = [];
    return Observable.of([dialog, dialog2]);
  }


  getOnlineUsersLogins(): Observable<string[]> {
    return Observable.of(["test","rogulenkoko"]);
  }

  getDialogsWithNewMessagesCount():Observable<Array<DialogsNewMessagesCountModel>>{
    return Observable.of([new DialogsNewMessagesCountModel("test", 2)]);
  }

  createDialog(dialog: CreateDialogRequest): Observable<DialogUpdateResponse>{
    return Observable.of(new DialogUpdateResponse(true));
  }

  leaveDialog(request: LeaveDialogRequest): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }

  inviteParticipants(request: InviteParticipantsRequest): Observable<BaseResponse>{
    return Observable.of(new BaseResponse(true));
  }
}
