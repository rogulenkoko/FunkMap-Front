import { FunkmapNotification, NotificationType } from "app/navbar/notifications/models/notification";

export class BandInviteConfirmationNotification extends FunkmapNotification{
    public bandLogin: string;
    public bandName: string;
    public answer: boolean;
    

    public static ToBandInviteConfirmationNotification(data: any): BandInviteConfirmationNotification{
        var result = new BandInviteConfirmationNotification();
        result.id = data.Id;
        result.notificationType = NotificationType.BandInviteConfirmation;
        result.needAnswer = data.NeedAnswer;
        
        if(data.InnerNotification){
            result.bandLogin = data.InnerNotification.BandLogin;
            result.bandName = data.InnerNotification.BandName;
            result.answer = data.InnerNotification.Answer;
        }
        
        result.date = new Date(data.Date);
        result.isRead = data.IsRead;
        result.userLogin = data.SenderLogin
        return result;
    }
}