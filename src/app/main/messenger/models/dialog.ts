import { Message } from "app/main/messenger/models";

export class Dialog {
    constructor(public dialogId?: string, public name?: string, public avatar?: string){

    }

    public participants: Array<string>;

    public isOnline: boolean;
    public lastMessage: Message;
    public newMessagesCount: number;

    public isNew: boolean;

    public static ToDialog(data: any): Dialog{
        var result =  new Dialog(data.DialogId, data.Name, data.Avatar);
        if(data.LastMessage){
            result.lastMessage = Message.ToMessage(data.LastMessage);
        } 
        result.participants = data.Participants;
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