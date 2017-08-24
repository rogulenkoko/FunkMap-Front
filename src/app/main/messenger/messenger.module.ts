import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from "app/main/messenger/messenger.component";
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { environment } from "environments/environment";
import { MessengerService, MessengerServiceHub } from "app/main/messenger/messenger.service";
import { MessengerServiceStub } from "app/main/messenger/messenger.service.stub";
import { DialogsComponent } from './dialogs/dialogs.component';
import { MessagesComponent } from './messages/messages.component';
import { DialogService } from "app/main/messenger/dialog.service";
import { MessageCreateComponent } from './message-create/message-create.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [MessengerComponent, DialogsComponent, MessagesComponent, MessageCreateComponent, DialogComponent],
  exports: [MessengerComponent],
  providers: [
     {
      provide: MessengerService,
      useClass: environment.production ? MessengerServiceHub : MessengerServiceStub
    },
    DialogService
  ]
})
export class MessengerModule { }
