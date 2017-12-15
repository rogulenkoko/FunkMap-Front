import { Component, OnInit, Input } from '@angular/core';
import { BandInviteConfirmationNotification } from 'app/navbar/notifications/models/band-invite-confirmation-notification';

@Component({
  selector: 'band-invite-confirmation-notification',
  templateUrl: './band-invite-confirmation-notification.component.html',
  styleUrls: ['./band-invite-confirmation-notification.component.scss','../notifications.component.scss']
})
export class BandInviteConfirmationNotificationComponent implements OnInit {

  @Input() notification: BandInviteConfirmationNotification;

  constructor() { }

  ngOnInit() {
  }

}
