import { BandPreview } from "app/main/band/models";

export class BandInviteMusicianRequest {
    constructor(public bandLogin: string, public musicianLogin: string){
        
    }
}

export class BandInviteMusiciansRequest {
    constructor(public bandLogin: string, public musicianLogins: Array<string>){
        
    }
}


export class BandInviteInfoRequest{
    constructor(public invitedMusician: string){

    }
}

export class BandInviteInfo{
    public availableBands: Array<BandPreview>;

    public static ToBandInviteInfo(data:any): BandInviteInfo{
        var result = new BandInviteInfo();
        if(!data) return result;
        var bands = new Array<BandPreview>();
        data.AvailableBands.forEach(band => {
            bands.push(BandPreview.ToBandPreview(band));
        });
        result.availableBands = bands;
        return result;
    }
}