import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from "app/main/messenger/messenger.component";
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { environment } from "environments/environment";
import { MessengerService, MessengerServiceHub } from "app/main/messenger/messenger.service";
import { MessengerServiceStub } from "app/main/messenger/messenger.service.stub";

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [MessengerComponent],
  exports: [MessengerComponent],
  providers: [
     {
      provide: MessengerService,
      useClass: environment.production ? MessengerServiceHub : MessengerServiceStub
    },
  ]
})
export class MessengerModule { }
