import { FunkmapNotification, NotificationType } from "app/navbar/notifications/models/notification";
import { BandInviteNotification } from "app/navbar/notifications/models/band-invite-notification";
import { BandInviteConfirmationNotification } from "app/navbar/notifications/models/band-invite-confirmation-notification";

export class NotificationsFactory {

    public static BuildNotifications(data: any):Array<FunkmapNotification>{
        var result = new Array<FunkmapNotification>();
        if(!data) return result;
        data.forEach(element => {
            result.push(NotificationsFactory.BuildNotification(element));
        });
        return result;
    }


    public static BuildNotification(data: any): FunkmapNotification{
        var type = data.NotificationType as NotificationType;
        console.log(data);
        switch(type){
            case NotificationType.BandInvite:
                return BandInviteNotification.ToBandInviteNotification(data);

            case NotificationType.BandInviteConfirmation:
                return BandInviteConfirmationNotification.ToBandInviteConfirmationNotification(data);

            default: return null;
        }
    }
}