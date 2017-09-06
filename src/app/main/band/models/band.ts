import { InstrumentType, MusicStyle } from "../../musician/models"
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";
import { VideoInfo } from "app/main/video-edit/video-info";

export class Band extends BaseModel{
    constructor(login?:string, name?:string, entytyType?: EntityType){
        super(login, name, entytyType);
        this.styles = [];
    }

    public showPrice: number;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<string>;
    public videoLinks: Array<string>;
    public styles: Array<MusicStyle>;

    public static ToBand(data: any): Band{
        var result = new Band(data.Login, data.Name, EntityType.Band);
        result.desiredInstruments = data.DesiredInstruments;
        result.showPrice = data.ShowPrice;
        result.musicians = data.Musicians;
        result.videoLinks = data.VideoLinks;

        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;

        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        result.avatar = data.Avatar;
        result.styles = data.Styles;

        result.description = data.Description;
        result.address = data.Address;
        result.videoInfos = VideoInfo.ToVideoInfos(data.VideoInfos);
        return result;
    }
}