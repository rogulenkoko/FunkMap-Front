
export class FunkmapNotification{
    public id: string;
    public date: Date;
    public userLogin: string;
    public notificationType: NotificationType;
    public isRead: boolean; 
}

export enum NotificationType{
    BandInvite = 1
}