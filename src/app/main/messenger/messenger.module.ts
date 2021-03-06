import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from "app/main/messenger/messenger.component";
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { environment } from "environments/environment";
import { MessengerService, MessengerServiceHttp } from "app/main/messenger/messenger.service";
import { MessengerServiceStub } from "app/main/messenger/messenger.service.stub";
import { DialogsComponent } from './dialogs/dialogs.component';
import { MessagesComponent } from './messages/messages.component';
import { DialogService } from "app/main/messenger/dialog.service";
import { MessageCreateComponent } from './message-create/message-create.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { MessageComponent } from './messages/message/message.component';
import { DialogBarComponent } from './dialog-bar/dialog-bar.component';
import { DialogInviteComponent } from './dialog-invite/dialog-invite.component';
import { MessengerHubServiceReal, MessengerHubService } from 'app/main/messenger/messenger-hub.service';
import { MessengerHubServiceStub } from 'app/main/messenger/messenger-hub.service.stub';
import { DialogPaticipantsComponent } from 'app/main/messenger/dialog-paticipants/dialog-paticipants.component';
import { DialogNameEditComponent } from './dialog-bar/dialog-name-edit/dialog-name-edit.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [MessengerComponent, 
                 DialogsComponent, 
                 MessagesComponent, 
                 MessageCreateComponent, 
                 DialogComponent, 
                 MessageComponent, 
                 DialogBarComponent, 
                 DialogInviteComponent, 
                 DialogPaticipantsComponent, 
                 DialogNameEditComponent],
  exports: [MessengerComponent],
  providers: [
     {
      provide: MessengerService,
      useClass: environment.useServer ? MessengerServiceHttp : MessengerServiceStub
    },
    {
      provide: MessengerHubService,
      useClass: environment.useServer ? MessengerHubServiceReal : MessengerHubServiceStub
    },
    DialogService
  ]
})
export class MessengerModule { }
