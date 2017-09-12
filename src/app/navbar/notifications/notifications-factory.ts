import { FunkmapNotification, NotificationType } from "app/navbar/notifications/models/notification";
import { BandInviteNotification } from "app/navbar/notifications/models/band-invite-notification";

export class NotificationsFactory {
    public static BuildNotification(data: any): FunkmapNotification{
        var type = data.NotificationType as NotificationType;

        switch(type){
            case NotificationType.BandInvite:
                return BandInviteNotification.ToBandInviteNotification(data);

            default: return null;
        }
    }
}