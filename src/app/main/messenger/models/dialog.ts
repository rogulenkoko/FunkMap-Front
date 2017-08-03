export class Dialog{
    constructor(public dialogId: string, public name: string, public avatar?: string){

    }

    public isOnline: boolean;

    public static ToDialog(data: any): Dialog{
        return new Dialog(data.DialogId, data.Name, data.Avatar);
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