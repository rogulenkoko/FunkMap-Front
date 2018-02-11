import { Message } from "app/main/messenger/models/message";

export class Dialog {
    constructor(public dialogId?: string, public name?: string, public avatar?: string){
        this.dialogType = DialogType.Base;
    }

    public participants: Array<string>;
    public dialogType: DialogType;


    public isOnline: boolean;
    public lastMessage: Message;
    public newMessagesCount: number;

    public creator: string

    public isNew: boolean;

    public static ToDialog(data: any): Dialog{
        if(!data) return null;
        var result =  new Dialog(data.DialogId, data.Name, data.AvatarId);
        if(data.LastMessage){
            result.lastMessage = Message.ToMessage(data.LastMessage);
        } 
        result.participants = data.Participants;
        result.creator = data.CreatorLogin;
        result.newMessagesCount = data.NewMessagesCount;
        result.dialogType = data.DialogType;
        return result;
    }

    public static ToDialogs(data:any): Array<Dialog>{
        if(!data) return [];
        var result = new Array<Dialog>();
        data.forEach(element => {
            result.push(Dialog.ToDialog(element));
        });
        return result;
    }
}

export enum DialogType
{
    /// <summary>
    /// Два собеседника
    /// </summary>
    Base = 1,

    /// <summary>
    /// Больше двух собеседников
    /// </summary>
    Conversation = 2
}