export class Message{
    constructor(public sender: string, public dialogId: string, public text:string, public data?: Date){

    }

    public static ToMessage(data: any): Message{
        return new Message(data.Sender, data.DialogId, data.Text, new Date(data.DateTimeUtc));
    }

    public static ToMessages(data: any): Array<Message>{
        if(!data) return [];
        var result = new Array<Message>();
        data.forEach(element => {
            result.push(Message.ToMessage(element));
        });
        return result;
    }
}