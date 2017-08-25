export class DialogCreateResponse{
    constructor(public isSuccess: boolean, public dialogId: string){

    }

    public static ToDialogCreateResponse(data: any): DialogCreateResponse{
        return new DialogCreateResponse(data.Success, data.DialogId);
    }
}