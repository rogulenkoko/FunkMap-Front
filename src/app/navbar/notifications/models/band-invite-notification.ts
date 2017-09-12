
import { FunkmapNotification, NotificationType } from "./notification";

export class BandInviteNotification extends FunkmapNotification{
    public bandLogin: string;
    public bandName: string;
    

    public static ToBandInviteNotification(data: any): BandInviteNotification{
        var result = new BandInviteNotification();
        result.notificationType = NotificationType.BandInvite;
        result.bandLogin = data.InnerNotification.BandLogin;
        result.bandName = data.InnerNotification.BandName;
        result.date = new Date(data.Date);
        result.isRead = data.IsRead;
        result.userLogin = data.SenderLogin;
        return result;
    }
}