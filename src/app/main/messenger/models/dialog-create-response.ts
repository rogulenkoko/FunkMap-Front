import { Dialog } from "app/main/messenger/models";

export class DialogUpdateResponse {
    constructor(public isSuccess: boolean, public dialog: Dialog){

    }

    public static ToDialogCreateResponse(data: any): DialogUpdateResponse{
        var dialog = Dialog.ToDialog(data.Dialog);
        return new DialogUpdateResponse(data.Success, dialog);
    }
}