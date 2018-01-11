import { Dialog } from "app/main/messenger/models";

export class DialogUpdateResponse {
    constructor(public isSuccess: boolean){

    }

    public static ToDialogCreateResponse(data: any): DialogUpdateResponse{
        return new DialogUpdateResponse(data.Success);
    }
}