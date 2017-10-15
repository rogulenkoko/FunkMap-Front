import { BaseResponse } from "app/tools";

export class InviteBandResponse extends BaseResponse{
    constructor(success: boolean, public isOwner: boolean){
        super(success);
    }

    public static ToInviteBandResponse(data: any): InviteBandResponse{
        return new InviteBandResponse(data.Success, data.IsOwner);
    }
}