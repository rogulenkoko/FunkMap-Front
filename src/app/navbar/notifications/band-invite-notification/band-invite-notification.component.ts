import { Component, OnInit, Input } from '@angular/core';
import { BandInviteNotification } from 'app/navbar/notifications/models/band-invite-notification';

@Component({
  selector: 'band-invite-notification',
  templateUrl: './band-invite-notification.component.html',
  styleUrls: ['./band-invite-notification.component.scss','../notifications.component.scss']
})
export class BandInviteNotificationComponent implements OnInit {

  @Input() notification: BandInviteNotification;

  constructor() { }

  ngOnInit() {
  }

}
