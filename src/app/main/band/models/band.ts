import { InstrumentType, MusicStyle } from "../../musician/models"
import { BaseModel } from "app/core";

export class Band extends BaseModel{
    constructor(login?:string, name?:string){
        super(login, name);
        this.styles = [];
    }

    public showPrice: number;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<string>;
    public videoLinks: Array<string>;
    public styles: Array<MusicStyle>;

    public static ToBand(data: any): Band{
        var result = new Band(data.Login, data.Name);
        result.desiredInstruments = data.DesiredInstruments;
        result.showPrice = data.ShowPrice;
        result.musicians = data.Musicians;
        result.videoLinks = data.VideoLinks;

        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;

        return result;
    }
}