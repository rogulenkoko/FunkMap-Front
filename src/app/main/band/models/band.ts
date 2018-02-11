import { InstrumentType, MusicStyle } from "../../musician/models"
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";
import { VideoInfo } from "app/tools/video-edit/video-info";
import { AudioInfo } from "app/core/models/base-model";

export class Band extends BaseModel{
    constructor(login?:string, name?:string){
        super(login, name, EntityType.Band);
    }

    public showPrice: number;
    public desiredInstruments: Array<InstrumentType>;
    public musicians: Array<string>;
    public videoLinks: Array<string>;
    public styles: Array<MusicStyle>;

    public static ToBand(data: any): Band{
        console.log(data);
        var result = new Band(data.Login, data.Name);
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

        result.avatarId = data.AvatarId;
        result.avatarMiniId = data.AvatarMiniId;
        
        result.styles = data.Styles;
        result.soundCloudTracks = AudioInfo.toAudioInfos(data.SoundCloudTracks);;
        result.description = data.Description;
        result.address = data.Address;
        result.videoInfos = VideoInfo.ToVideoInfos(data.VideoInfos);
        result.userLogin = data.UserLogin;
        result.isActive = data.IsActive;
        return result;
    }
}