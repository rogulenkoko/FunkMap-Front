import * as moment from "moment";

export class Message{
    constructor(public sender: string, public dialogId: string, public text:string, public date?: Date){
        this.setDate(date);
    }

    public setDate(date: Date){
        if(!date){
            this.dateString = "";
            return;
        }
        var start = moment(date);
        var end = moment(new Date());
        var daysDifference = Math.abs(start.diff(end, "days"));

        var daysFromWeekStart = end.diff(moment().startOf('week'), "days");
        if(daysDifference == 0){
            this.dateString = start.format("HH:mm")
        }

        if(daysDifference > 0 && daysDifference <= daysFromWeekStart){
            this.dateString = start.format("ddd").toString();
        }

        if(daysDifference > daysFromWeekStart && daysDifference < 365){
            this.dateString = start.format("DD.MM").toString();
        }

        if(daysDifference > 365){
            this.dateString = start.format("DD.MM.YY").toString();
        }

        this.timeString = start.format("HH:mm").toString();
    }

    public dateString: string;
    public timeString: string;

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