export class DialogReadModel {
    constructor(public dialogId: string, public userWhoRead: string) {

    }

    static ToDialogReadModel(data: any): DialogReadModel {
        if (!data) return null;
        return new DialogReadModel(data.DialogId, data.UserWhoRead);
    }
}