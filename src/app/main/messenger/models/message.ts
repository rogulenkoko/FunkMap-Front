import * as moment from "moment";
import { FileType } from "app/tools/upload/upload.component";

export class Message {
    constructor(public sender: string, public dialogId: string, public text: string, public date?: Date) {
    }

    public isNew: boolean;

    public dateString: string;
    public avatar: string;

    public messageType: MessageType;

    public content: Array<Content>;

    public static ToMessage(data: any): Message {
        var result = new Message(data.Sender, data.DialogId, data.Text, new Date(data.DateTimeUtc));
        result.isNew = data.IsNew;
        result.content = Content.ToContents(data.Content);
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

export abstract class Content {
    constructor(public contentType: FileType, public name: string, public size: number) {

    }

    public data: string;
    public dataUrl: string;

    public isLoaded: boolean;


    static ToContent(data: any): Content{
        var type = data.ContentType;
        switch (type) {
            case FileType.Image:
                var item = new ImageContent(data.Name, data.Size);
                item.dataUrl = data.DataUrl;
                return item;

            case FileType.Other:
                var fileItem = new FileContent(data.Name, data.Size);
                fileItem.dataUrl = data.DataUrl;
                return fileItem;
        }
    }

    static ToContents(data: any): Array<Content> {
        var result = new Array<Content>();
        if (!data) return result;

        data.forEach(element => {
            result.push(Content.ToContent(element));
        });
        return result;
    }
}

export class ImageContent extends Content {
    constructor(name: string, size: number, data?: string) {
        super(FileType.Image, name, size);
        this.data = data;
    }

    public width: number;
    public height: number;
}

export class FileContent extends Content {
    constructor(name: string, size: number, data?: string) {
        super(FileType.Other, name, size);
        this.data = data;
    }
}

export enum MessageType {
    Base = 1,
    System = 2
}