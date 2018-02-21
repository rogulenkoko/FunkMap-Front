import { BaseResponse } from "app/tools";

export class InviteBandResponse extends BaseResponse{
    constructor(success: boolean, public isOwner: boolean, public musicianLogin?: string){
        super(success);
    }

    public static ToInviteBandResponse(data: any): InviteBandResponse{
        return new InviteBandResponse(data.Success, data.IsOwner, data.MusicianLogin);
    }

    public static ToInviteBandResponseArray(data: any): Array<InviteBandResponse>{
        var result = new Array<InviteBandResponse>();
        if(!data) return result;

        data.forEach(element => {
            result.push(InviteBandResponse.ToInviteBandResponse(element));
        });

        return result;
    }
}