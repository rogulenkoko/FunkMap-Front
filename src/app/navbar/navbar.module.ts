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
import { NavbarService } from "app/navbar/navbar.service";
import { NotificationSideComponent } from 'app/navbar/notifications/notification-side/notification-side.component';
import { NotificationListComponent } from 'app/navbar/notifications/notification-list/notification-list.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NotificationsComponent,
    BandInviteNotificationComponent,
    BandInviteConfirmationNotificationComponent,
    NotificationSideComponent,
    NotificationListComponent
  ],
  imports: [
    CoreModule,
    ToolsModule,
    ResponsiveModule
  ],
  exports:[NavbarComponent,NotificationsComponent, NotificationSideComponent],
  providers: [
    {
      provide: NotificationService,
      useClass: environment.useServer ? NotificationServiceHttp : NotificationServiceStub
    },
    {
      provide: NotificationHubService,
      useClass: environment.useServer ? NotificationHubServiceReal : NotificationHubServiceStub
    },
    NotificationsInfoService,
    NavbarService
  ]
})
export class NavbarModule { }


