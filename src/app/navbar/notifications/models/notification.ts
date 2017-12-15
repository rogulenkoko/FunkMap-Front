
export class FunkmapNotification{
    public id: string;
    public date: Date;
    public userLogin: string;
    public notificationType: NotificationType;
    public isRead: boolean;
    public userAvatar: string;
    public needAnswer: boolean;
    
    public isConfirmed: boolean;
}

export enum NotificationType{
    BandInvite = 1,
    BandInviteConfirmation = 2
}