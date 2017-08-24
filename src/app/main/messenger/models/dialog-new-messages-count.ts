export class DialogsNewMessagesCountModel {
    constructor(public dialogId: string, public newMessagesCount: number) {

    }

    public static ToDialogsNewMessagesCountModels(data: any): Array<DialogsNewMessagesCountModel>{
        var result = new Array<DialogsNewMessagesCountModel>();
        data.forEach(element => {
            result.push(new DialogsNewMessagesCountModel(element.DialogId, element.NewMessagesCount));
        });
        return result;
    }
}