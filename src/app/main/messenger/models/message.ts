import * as moment from "moment";

export class Message {
    constructor(public sender: string, public dialogId: string, public text: string, public date?: Date) {
    }

    public isNew: boolean;

    public dateString: string;
    public avatar: string;

    public messageType: MessageType;

    public static ToMessage(data: any): Message {
        var result = new Message(data.Sender, data.DialogId, data.Text, new Date(data.DateTimeUtc));
        result.isNew = data.IsNew;
        
        result.messageType = data.MessageType;
        return result;
    }

    public static ToMessages(data: any): Array<Message> {
        if (!data) return [];
        var result = new Array<Message>();
        data.forEach(element => {
            result.push(Message.ToMessage(element));
        });
        return result;
    }


}

export enum MessageType {
    Base = 1,
    System = 2
}