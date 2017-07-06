import { InstrumentType, MusicStyle } from "../../musician/models"
import { BaseModel } from "app/core";

export class BandPreview extends BaseModel{
    constructor(login:string, name:string){
        super(login, name);
    }

    public styles: Array<MusicStyle>;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<string>;
    public description: string;

    public static ToBandPreview(data: any): BandPreview{
        var result = new BandPreview(data.Id, data.Name);
        result.desiredInstruments = data.DesiredInstruments;
        result.musicians = data.Musicians;
        result.styles = data.Styles;
        result.description = data.Description;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        return result;
    }
}