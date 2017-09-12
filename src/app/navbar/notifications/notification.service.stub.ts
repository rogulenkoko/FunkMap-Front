import { Injectable } from '@angular/core';
import { NotificationService } from 'app/navbar/notifications/notification.service';
import { Observable } from 'rxjs/Observable';
import { BandInviteNotification } from 'app/navbar/notifications/models/band-invite-notification';
import { FunkmapNotification } from 'app/navbar/notifications/models/notification';

@Injectable()
export class NotificationServiceStub extends NotificationService {

  getNotifications(): Observable<Array<FunkmapNotification>>{
    var bandInvite = new BandInviteNotification();
    bandInvite.bandLogin = "beatles";
    bandInvite.bandName = "The Beatles";
    bandInvite.date = new Date();
    bandInvite.userLogin = "rogulenkoko";

    return Observable.of([bandInvite]);
  }
}
