import { FunkmapNotification, NotificationType } from "app/navbar/notifications/models/notification";
import { BandInviteNotification } from "app/navbar/notifications/models/band-invite-notification";

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

        switch(type){
            case NotificationType.BandInvite:
                return BandInviteNotification.ToBandInviteNotification(data);

            default: return null;
        }
    }
}