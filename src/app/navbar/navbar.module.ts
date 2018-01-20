import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { NotificationServiceHttp, NotificationService } from "app/navbar/notifications/notification.service";
import { NotificationServiceStub } from "app/navbar/notifications/notification.service.stub";
import { NavbarComponent } from "app/navbar/navbar.component";
import { NotificationsComponent } from "app/navbar/notifications/notifications.component";
import { BandInviteNotificationComponent } from './notifications/band-invite-notification/band-invite-notification.component';
import { NotificationsInfoService } from "app/navbar/notifications/notifications-info.service";
import { NotificationHubServiceReal, NotificationHubService } from "app/navbar/notifications/notification-hub.service";
import { NotificationHubServiceStub } from "app/navbar/notifications/notification-hub.service.stub";
import { BandInviteConfirmationNotificationComponent } from './notifications/band-invite-confirmation-notification/band-invite-confirmation-notification.component';
import { ResponsiveModule } from 'ng2-responsive';

@NgModule({
  declarations: [
    NavbarComponent,
    NotificationsComponent,
    BandInviteNotificationComponent,
    BandInviteConfirmationNotificationComponent
  ],
  imports: [
    CoreModule,
    ToolsModule,
    ResponsiveModule
  ],
  exports:[NavbarComponent,NotificationsComponent],
  providers: [
    {
      provide: NotificationService,
      useClass: environment.production ? NotificationServiceHttp : NotificationServiceStub
    },
    {
      provide: NotificationHubService,
      useClass: environment.production ? NotificationHubServiceReal : NotificationHubServiceStub
    },
    NotificationsInfoService
  ]
})
export class NavbarModule { }


