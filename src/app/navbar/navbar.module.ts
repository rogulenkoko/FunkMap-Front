import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { NotificationServiceHttp, NotificationService } from "app/navbar/notifications/notification.service";
import { NotificationServiceStub } from "app/navbar/notifications/notification.service.stub";
import { NavbarComponent } from "app/navbar/navbar.component";
import { NotificationsComponent } from "app/navbar/notifications/notifications.component";
import { BandInviteNotificationComponent } from './notifications/band-invite-notification/band-invite-notification.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NotificationsComponent,
    BandInviteNotificationComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[NavbarComponent,NotificationsComponent],
  providers: [
    {
      provide: NotificationService,
      useClass: environment.production ? NotificationServiceHttp : NotificationServiceStub
    }
  ]
})
export class NavbarModule { }


